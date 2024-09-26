"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { CREATOR_SECRET } from '@/app/utils/utils'
import { useSession } from 'next-auth/react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [edited, setEdited] = useState(false);
  const { data : session } = useSession();
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (session?.user?.email === CREATOR_SECRET) {
      setIsCreator(true);
    }
  }, []);

  return (
    <BlogContext.Provider value={{ edited, setEdited, isCreator }}>
      {children}
    </BlogContext.Provider>
  );
};