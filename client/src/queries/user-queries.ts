import { httpRequest } from "@/utils/http-request.ts";
import { UserProfile } from "@/types/user-types.ts";

export const getUserProfile = async () => {
  const { data, error } = await httpRequest<UserProfile>("/users/profile");
  if (!data || error) return null;
  return data;
};
