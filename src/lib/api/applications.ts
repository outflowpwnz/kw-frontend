import { apiClient } from './client'
import { ApplicationPayload, ApplicationResponse } from './types'

export async function submitApplication(payload: ApplicationPayload): Promise<ApplicationResponse> {
  const { data } = await apiClient.post<ApplicationResponse>('/applications', payload)
  return data
}
