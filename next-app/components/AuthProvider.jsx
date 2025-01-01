"use client"
import React from "react"
import HomePage from "@/app/page"
import { useActiveAccount } from "thirdweb/react"

const AuthProvider = ({ children }) => {
  const account = useActiveAccount()
  if (!account) {
    return <HomePage />
  } else {
    return <>{children}</>
  }
}

export default AuthProvider
