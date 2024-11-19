import axios, { AxiosError, type AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { config } from '@/constants/config'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { AuthResponse, RefreshTokenResponse } from '@/types/auth.type'
import { ErrorResponse } from '@/types/utils.type'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '../apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '../utils/utils'
import {
  clearStore,
  getAccessTokenFromStore,
  getRefreshTokenFromStore,
  setAccessTokenToStore,
  setProfileToStore,
  setRefreshTokenToStore
} from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  private refreshToken: string | null
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = null
    this.refreshToken = null
    this.refreshTokenRequest = null

    // Ensure getting token from AsyncStorage asynchronously
    this.initializeTokens()

    this.instance = axios.create({
      baseURL: config.EXPO_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 day
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 day
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToStore(this.accessToken)
          setRefreshTokenToStore(this.refreshToken)
          setProfileToStore(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = null
          this.refreshToken = null
          clearStore()
        }
        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          console.log('message', message)
        }
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Prevent calling refresh token multiple times
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Reset the refreshTokenRequest after 10s to allow retrying refresh token requests
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          clearStore()
          this.accessToken = null
          this.refreshToken = null
          console.log('error', error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }

  // Add this method to initialize tokens asynchronously
  private async initializeTokens() {
    try {
      this.accessToken = await getAccessTokenFromStore()
      this.refreshToken = await getRefreshTokenFromStore()
    } catch (error) {
      console.error('Error initializing tokens', error)
    }
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToStore(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearStore()
        this.accessToken = null
        this.refreshToken = null
        throw error
      })
  }
}

const http = new Http().instance

export default http
