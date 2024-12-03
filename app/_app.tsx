"use client"
import { AppProps } from "next/app";
import NewSidebar from "./sidebar/page";

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <NewSidebar>
      <Component {...pageProps} />
    </NewSidebar>
  );
}

export default MyApp;
