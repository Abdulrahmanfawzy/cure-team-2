export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string | null;
  location: string | null;
  profile_image: string | null;
  is_active: boolean;
  created_at: string;
}
