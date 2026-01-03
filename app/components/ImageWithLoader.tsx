"use client";

import Image, { ImageProps } from "next/image";
import { usePreload } from "./PreloadProvider";

const ImageWithLoader = (props: ImageProps) => {
  const { increment } = usePreload();

  const { fill, sizes, onLoad, onError, ...rest } = props;

  return (
    <Image
      {...rest}
      fill={fill}
      sizes={sizes ?? (fill ? "100vw" : undefined)}
      onLoad={(e) => {
        increment();
        onLoad?.(e);
      }}
      onError={(e) => {
        increment();
        onError?.(e);
      }}
    />
  );
};

export default ImageWithLoader;
