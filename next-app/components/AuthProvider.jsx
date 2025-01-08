"use client";

import HomePage from "@/app/page";
// import { navigate } from "@/lib/actions";
import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

const AuthProvider = ({ children }) => {
  const account = useActiveAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  if (!account) {
    return <HomePage/>
    // navigate('/');
  }
  
  return <>{children}</>;
};

export default AuthProvider;
