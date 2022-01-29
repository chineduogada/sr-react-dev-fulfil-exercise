import { Box } from "@chakra-ui/layout";
import NextImage from "next/image";
import { FC } from "react";

type Props = {
  alt: string;
  src: string;
  quality?: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  w: string | number | object;
  h: string | number | object;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  dropShadow?: string;
  isProduct?: string;

  // All other props
  [x: string]: any;
};

const Image: FC<Props> = ({
  alt,
  src,
  quality,
  layout = "fill",
  w,
  h,
  objectFit = "cover",
  objectPosition = "center",
  dropShadow,
  isProduct = true,
  ...rest
}) => {
  return (
    <Box
      bg="brand.gray6"
      pos="relative"
      overflow="hidden"
      rounded="md"
      flexShrink={0}
      w={w}
      h={h}
      {...rest}
    >
      <NextImage
        src={src}
        alt={alt || src}
        quality={quality}
        layout={layout}
        objectFit={isProduct ? "contain" : objectFit}
        objectPosition={isProduct ? "center" : objectPosition}
        className={`next-image${dropShadow ? "--drop-shadow" : ""}`}
      />
    </Box>
  );
};

export default Image;
