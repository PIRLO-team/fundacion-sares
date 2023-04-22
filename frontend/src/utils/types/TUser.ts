export type TUser = {
  is_active: boolean;
  created_date: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profession: string;
  userRole: {
    role_id: string;
    role_name: string;
    role_description: string;
  };
  phone: string | undefined;
  other_contact: string | undefined;
  img_profile: string | undefined;
  coverPhotoURL: string | undefined;
};
