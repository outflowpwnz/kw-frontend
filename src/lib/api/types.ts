export interface ApplicationPayload {
  source?: string
  couple_name?: string
  instagram: string
  contact: string
  wedding_date?: string
  guests_count?: number
  budget?: string
  venue_preferences?: string
  has_ceremony?: boolean
  has_walk?: boolean
  has_buffet?: boolean
  stylist_service?: string
  photographer_service?: string
  videographer_service?: string
  host_service?: string
  evening_entertainment?: string
  decor?: string
  vision?: string
  no_go?: string
  other_weddings_feedback?: string
  how_found?: string
  preferred_meeting_time?: string
  privacy_accepted: boolean
}

export interface ApplicationResponse {
  id: string
  created_at: string
}
