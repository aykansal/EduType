"use client"

import { ThirdwebProvider } from "thirdweb/react"

export const ThirdwebClientProvider = ({ children }) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>
}
