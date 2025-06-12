import { useQuery, UseQueryResult, QueryKey } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

type EntityListParams<T> = {
  endpoint: string;
  query?: string;
  page?: number;
  perPage?: number;
  initialData?: T[];
};

type PaginationMeta = {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
  total?: number;
  last_page?: number;
};

type PaginationLinks = {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
};

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
  };
};

type EntityListReturn<T> = {
  data: T[];
  pagination: {
    links: PaginationLinks;
    meta: PaginationMeta;
  };
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  refetch: () => void;
};

const baseUrl = `${import.meta.env.VITE_API_PROTOCOL}${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_PORT || ""}${import.meta.env.VITE_API_PREFIX || ""}`;

export function useEntityList<T>({
  endpoint,
  query = "",
  page = 1,
  perPage,
  initialData = [],
}: EntityListParams<T>): EntityListReturn<T> {
  const token = (() => {
    try {
      const accountCookie = Cookies.get("account");
      const account = accountCookie ? JSON.parse(accountCookie) : null;
      return account?.token || "";
    } catch (error) {
      console.error("Failed to parse token from cookies", error);
      return "";
    }
  })();

  const buildUrl = (): string => {
    const url = new URL(`${baseUrl}${endpoint}`);
    url.searchParams.append("search", query);
    url.searchParams.append("page", page.toString());
    if (perPage) {
      url.searchParams.append("per_page", perPage.toString());
    }
    return url.toString();
  };

  const queryKey: QueryKey = ["entityList", endpoint, query, page, perPage];

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }: UseQueryResult<ApiResponse<T>, AxiosError> = useQuery({
    queryKey,
    queryFn: async (): Promise<ApiResponse<T>> => {
      const response = await axios.get<ApiResponse<T>>(buildUrl(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": Cookies.get("i18next"),
        },
      });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    enabled: !!token,
  });

  return {
    data: data?.data?.data || initialData,
    pagination: {
      links: data?.data?.links || {
        first: null,
        last: null,
        next: null,
        prev: null,
      },
      meta: data?.data?.meta || {
        current_page: page,
        from: 1,
        path: "",
        per_page: perPage || 12,
        to: 0,
      },
    },
    isLoading,
    isError,
    error: error || null,
    refetch: refetch as () => void,
  };
}
