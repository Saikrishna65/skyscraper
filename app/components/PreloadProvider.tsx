"use client";

import React, { createContext, useContext, useState } from "react";

type PreloadContextType = {
  loaded: number;
  total: number;
  increment: () => void;
};

const PreloadContext = createContext<PreloadContextType | null>(null);

export const PreloadProvider = ({
  children,
  totalAssets,
}: {
  children: React.ReactNode;
  totalAssets: number;
}) => {
  const [loaded, setLoaded] = useState(0);

  const increment = () => {
    setLoaded((prev) => Math.min(prev + 1, totalAssets));
  };

  return (
    <PreloadContext.Provider value={{ loaded, total: totalAssets, increment }}>
      {children}
    </PreloadContext.Provider>
  );
};

export const usePreload = () => {
  const ctx = useContext(PreloadContext);
  if (!ctx) throw new Error("usePreload must be inside PreloadProvider");
  return ctx;
};
