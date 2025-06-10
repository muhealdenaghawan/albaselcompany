import axios from "axios";
import Cookies from "js-cookie";

// --- Types ---

interface ApiSuccessResponse<T> {
  status: number;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export type DeleteResponse = {
  status: number;
  message: string;
  success: boolean;
  error?: string;
  data?: null;
};

export type FormResponse<T> = {
  status: number;
  message: string;
  success: boolean;
  data?: T | null;
  errors?: Record<string, string[]>;
};

export type ActionResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// --- Config ---

const baseUrl = `${import.meta.env.VITE_API_PROTOCOL}${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_PORT || ""}${import.meta.env.VITE_API_PREFIX || ""}`;

const getToken = (): string | null => {
  const account = Cookies.get("account");
  try {
    return account ? JSON.parse(account).token : null;
  } catch {
    return null;
  }
};

const authAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    "Accept-Language": Cookies.get("i18next"),
  },
});

authAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- CRUD Methods ---

/**
 * Create an entity via POST (multipart/form-data)
 */
export async function createEntity<T>(endpoint: string, formData: FormData | {}): Promise<FormResponse<T>> {
  try {
    const { data } = await authAxios.post<ApiSuccessResponse<T>>(endpoint, formData);
    return {
      status: data.status,
      message: data.message,
      success: true,
      data: data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const err = error.response.data as ApiErrorResponse;
      return {
        status: error.response.status,
        message: err.message || "Error occurred",
        success: false,
        errors: err.errors,
      };
    }

    return {
      status: 500,
      message: "Unknown error",
      success: false,
    };
  }
}

/**
 * Update an entity via POST to `/endpoint/:slug`
 */
export async function updateEntity<T>(
  endpoint: string,
  slug: string,
  formData: FormData | {}
): Promise<FormResponse<T>> {
  try {
    const { data } = await authAxios.post<ApiSuccessResponse<T>>(`${endpoint}/${slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      status: data.status,
      message: data.message,
      success: true,
      data: data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const err = error.response.data as ApiErrorResponse;
      return {
        status: error.response.status,
        message: err.message || "Error occurred",
        success: false,
        errors: err.errors,
      };
    }

    return {
      status: 500,
      message: "Unknown error",
      success: false,
    };
  }
}

/**
 * Delete an entity via DELETE to `/endpoint/:slug`
 */
export async function deleteEntity(endpoint: string, slug: string): Promise<DeleteResponse> {
  try {
    const { data } = await authAxios.delete<ApiSuccessResponse<null>>(`${endpoint}/${slug}`);
    return {
      status: data.status,
      message: data.message,
      success: true,
      data: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const err = error.response.data as ApiErrorResponse;
      return {
        status: error.response.status,
        message: err.message || "An error occurred",
        success: false,
        error: err.message,
        data: null,
      };
    }

    return {
      status: 500,
      message: "An unknown error occurred",
      success: false,
      error: "An unknown error occurred",
      data: null,
    };
  }
}
