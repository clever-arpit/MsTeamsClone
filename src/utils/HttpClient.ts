import axios, { HttpStatusCode, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { StatusCodes } from './httpStatus';
import { SecureStorage } from './SecureStorage';
import { deviceInfoManager } from './DeviceInfoManager';
import ToastMessage from '../component/ToastMessage';
import { localLogout } from './Helper';
import { DeviceType } from '../types/EnumType';

const REQUEST_TIMEOUT_MS = 30000;

export interface HttpClientSettings {
  showToast?: boolean;
  showError?: boolean;
  headerContentType?: 'json' | 'multipart';
}

export interface Extension {
  profile: string;
  name: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  meta_data?: any;
  pinned_message?: any;
  build_number?: string | number;
  statusCode?: number;
  access_token?: string;
  api_version?: string;
  description?: String[];
  extension?: Extension;
  old_version?: string;
  private_key?: string;
  public_key?: string;
  status?: string;
  token_type?: string;
  version?: string;
}

export interface HttpClientType {
  request<T = any>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    settings?: HttpClientSettings,
  ): Promise<ApiResponse>;

  get<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
    settings?: HttpClientSettings,
  ): Promise<ApiResponse>;

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    settings?: HttpClientSettings,
  ): Promise<ApiResponse>;

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    settings?: HttpClientSettings,
  ): Promise<ApiResponse>;

  delete<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
    settings?: HttpClientSettings,
  ): Promise<ApiResponse>;
}

async function handleHttpResponse<T>(
  response: ApiResponse,
  showToast: boolean,
) {
  const { data } = response;
  const status = data.statusCode;

  switch (status) {
    case StatusCodes.CREATED: // 201
      return response.data;
    case StatusCodes.OK: // 200
      if (showToast && data && (data as any).message) {
        ToastMessage('Success', data.message);
      }
      return data;
    default:
      return data;
  }
}

async function request<T = any>(
  method: string,
  url: string,
  data: any = null,
  config: AxiosRequestConfig = {},
  settings: HttpClientSettings = {},
): Promise<any> {
  try {
    settings.showToast = settings.showToast ?? true;
    settings.showError = settings.showError ?? true;
    settings.headerContentType = settings.headerContentType ?? 'json';

    const authToken = SecureStorage.getString('authToken');
    const fcmToken = SecureStorage.getString('fcmToken');
    const platform =
      Platform.OS === 'android' ? DeviceType.ANDROID : DeviceType.IOS;

    const { deviceUUID, appVersion, deviceName } = await deviceInfoManager();

    // 🔹 Headers
    const headers = {
      Authorization: `Bearer ${authToken ?? ''}`,
      'FCM-Token': fcmToken,
      'Device-Type': platform,
      'Device-Name': deviceName,
      'Device-Id': deviceUUID.toLowerCase(),
      'App-Version': appVersion,
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      'Push-Notification': 1,
      'Content-Type': '',
    };

    if (settings.headerContentType === 'json') {
      headers['Content-Type'] = 'application/json';
    } else {
      if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
      }
    }

    const requestBody: AxiosRequestConfig = {
      method,
      url,
      timeout: REQUEST_TIMEOUT_MS,
      headers,
      ...config,
      ...(method !== 'GET' ? { data } : {}),
    };

    console.log('requestBody--------', requestBody);

    // 🔹 Request
    const response: ApiResponse = await axios(requestBody);
    const handledResponse = await handleHttpResponse(
      response,
      settings?.showToast || false,
    );
    return handledResponse;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      throw error;
    }

    console.error('Error', error, data);

    const errorMessage = error.response
      ? error.response.data.errorMessage || error.response.data.message
      : error.message;

    if (error.response?.status === HttpStatusCode.TooManyRequests) {
      console.log('Too many requests. Please try again later.');
    } else {
      settings.showError && ToastMessage('Error', errorMessage, 'error');
    }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      console.log('error.response?.status------', error.response?.status);
      localLogout();
    } else {
      console.log(errorMessage, 'errorMessage');
      throw new Error(errorMessage);
    }

    return { success: false, message: errorMessage } as ApiResponse;
  }
}

// 🔹 Public Client
const HttpClient: HttpClientType = {
  request,
  get<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
    settings: HttpClientSettings = {},
  ) {
    const queryString = Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = url + (queryString ? separator + queryString : '');
    return request<T>('GET', finalUrl, data, config, settings);
  },

  post<T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {},
    settings: HttpClientSettings = {},
  ) {
    return request<T>('POST', url, data, config, settings);
  },

  put<T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {},
    settings: HttpClientSettings = {},
  ) {
    return request<T>('PUT', url, data, config, settings);
  },

  delete<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
    settings: HttpClientSettings = {},
  ) {
    const queryString = Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = url + (queryString ? separator + queryString : '');
    return request<T>('DELETE', finalUrl, data, config, settings);
  },
};

export default HttpClient;
