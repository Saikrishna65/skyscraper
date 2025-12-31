"use client";

import { useEffect, useState } from "react";
import { usePreload } from "./PreloadProvider";

const Loader = () => {
  const { loaded, total } = usePreload();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (loaded >= total) {
      // small delay for smoothness
      setTimeout(() => {
        setHide(true);
        document.body.style.overflow = "auto";
      }, 500);
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [loaded, total]);

  if (hide) return null;

  const progress = Math.round((loaded / total) * 100);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <p className="text-xs tracking-widest uppercase">Loading</p>
        <h1 className="text-4xl font-bold">{progress}%</h1>
        <div className="w-40 h-[2px] bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
