"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface PropsForChildren {
  children: ReactNode;
}

export default function Providers({ children }: PropsForChildren) {
  return <Provider store={store}>{children}</Provider>;
}
