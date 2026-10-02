export interface NotificationData {
  title?: string;
  message?: string;
  booking_id?: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  read_at: string | null;
  data: NotificationData;
}

export interface NotificationsPage {
  current_page: number;
  data: NotificationItem[];
  last_page: number;
  per_page: number;
  total: number;
}
