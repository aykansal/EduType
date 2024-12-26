"use client";

// @ts-expect-error ignore
import { ThirdwebProvider } from "thirdweb/react";

export const ThirdwebClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ThirdwebProvider value>{children}</ThirdwebProvider>;
};  