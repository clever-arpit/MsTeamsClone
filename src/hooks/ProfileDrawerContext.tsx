import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileDrawerContextProps {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ProfileDrawerContext = createContext<ProfileDrawerContextProps>({} as ProfileDrawerContextProps);

export const ProfileDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <ProfileDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </ProfileDrawerContext.Provider>
  );
};

export const useProfileDrawer = () => useContext(ProfileDrawerContext);

export default ProfileDrawerContext;
