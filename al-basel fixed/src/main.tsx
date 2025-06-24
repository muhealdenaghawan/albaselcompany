import { useAuthStore } from "@/stores/authStore";
import { handleServerError } from "@/utils/handle-server-error";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AxiosError } from "axios";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { toast } from "sonner";
import { FontProvider } from "./context/font-context";
import { ThemeProvider } from "./context/theme-context";

import "./index.css";
// Generated Routes
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error });

        if (failureCount >= 0 && import.meta.env.DEV) return false;
        if (failureCount > 3 && import.meta.env.PROD) return false;

        return !(error instanceof AxiosError && [401, 403].includes(error.response?.status ?? 0));
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error);

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error("Content not modified!");
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("Session expired!");
          useAuthStore.getState().auth.reset();
          const redirect = `${router.history.location.href}`;
          router.navigate({ to: "/sign-in", search: { redirect } });
        } else if (error.response?.status === 500) {
          toast.error("Internal Server Error!");
          router.navigate({ to: "/500" });
        } else if (error.response?.data?.message) {
          toast.error("Query Data" + error.response?.data?.message);
        }
      }
    },
  }),
});

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "sessionStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locals/{{lng}}/translation.json", // Note the leading slash
    },
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  })
  .then(() => {
    console.log("i18n initialized:", {
      language: i18n.language,
      languages: i18n.languages,
      storeData: i18n.store.data,
    });
  })
  .catch((err) => {
    console.error("i18n initialization failed:", err);
  });

i18n.on("loaded", (loaded) => {
  console.log("i18n resources loaded:", loaded);
});

i18n.on("failedLoading", (lng, ns, msg) => {
  console.error("i18n failed loading:", { lng, ns, msg });
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <FontProvider>
              <RouterProvider router={router} />
            </FontProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </StrictMode>
  );
}
