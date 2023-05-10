import { createContext } from "react";

const UserProfile = createContext();

export const UserProfileProvider = UserProfile.Provider;
export const UserProfileConsumer = UserProfile.Consumer;

export default UserProfile;
