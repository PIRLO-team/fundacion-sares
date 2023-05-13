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
  document: string;
  phone: string;
  other_contact: string;
  img_profile: string;
  coverPhotoURL: string;
};
