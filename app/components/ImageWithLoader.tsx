"use client";

import Image, { ImageProps } from "next/image";
import { usePreload } from "./PreloadProvider";

const ImageWithLoader = (props: ImageProps) => {
  const { increment } = usePreload();

  return <Image {...props} onLoadingComplete={increment} onError={increment} />;
};

export default ImageWithLoader;
