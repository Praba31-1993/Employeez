"use client";
import { StrictMode } from "react";
import { AppProps } from "next/app";
import NewSidebar from "./sidebar/page";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <NewSidebar>
        <Component {...pageProps} />
      </NewSidebar>
    </StrictMode>
  );
}

export default MyApp;
