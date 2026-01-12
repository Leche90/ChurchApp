// types/prayer.d.ts
export interface PrayerRequest {
    name: string;
    email?: string;
    request: string;
  }
  
  export interface PrayerResponse {
    success: boolean;
    error?: string;
  }