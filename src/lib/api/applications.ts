import { apiClient } from './client'
import type { ApplicationPayload, ApplicationResponse } from './types'

export async function submitApplication(payload: ApplicationPayload): Promise<ApplicationResponse> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { privacyAccepted: _, ...data } = payload
  const response = await apiClient.post<{ data: ApplicationResponse } | ApplicationResponse>(
    '/applications',
    data
  )
  const body = response.data as { data?: ApplicationResponse } & ApplicationResponse
  return body.data ?? body
}
