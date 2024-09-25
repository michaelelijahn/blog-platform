"use client"
import { createContext, useState, useContext } from 'react';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [edited, setEdited] = useState(false);

  return (
    <BlogContext.Provider value={{ edited, setEdited }}>
      {children}
    </BlogContext.Provider>
  );
};