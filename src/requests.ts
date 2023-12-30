import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8008";

const adminAxiosInstance = axios.create({
  baseURL: `${BASE_URL}/admin`,
});

let authToken: string | null = null;

adminAxiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers!["passkey"] = authToken;
    return config;
  }
  return config;
});

export async function authAdmin(telegram_id: string, passkey: string) {
  interface authResponse {
    token: string;
  }
  try {
    const response = await adminAxiosInstance.post<
      any,
      AxiosResponse<authResponse>
    >(`/`, {
      telegram_id: telegram_id,
      passkey: passkey,
    });

    authToken = response.data.token;
    const admin = await getAdmin();
    return admin;
  } catch (err) {
    console.log();
    return null;
  }
}

export async function getAdmin() {
  interface UserResponse {
    passkey: string;
    telegram_id: string;
    is_username_id: boolean;
    role: "creator" | "admin" | "client";
  }

  const response = await adminAxiosInstance.get<
    any,
    AxiosResponse<UserResponse>
  >("/");

  return response.data;
}

export async function getAllCreators() {
  interface CreatorResponse {
    passkey: string;
    telegram_id: string;
    is_username_id: boolean;
    role: "creator" | "admin" | "client";
  }

  interface CreatorsResponse {
    users: CreatorResponse[];
  }
  try {
    const response = await adminAxiosInstance.get<
      any,
      AxiosResponse<CreatorsResponse>
    >("/creator/all/");
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
