import React, { useEffect, useRef, useState } from "react";
import { ComplexImageType, ImageType } from "@yext/pages/components";

const MKTGCDN_URL_REGEX =
  /(https?:\/\/a.mktgcdn.com\/p(?<env>-sandbox|-qa|-dev)?\/)(?<uuid>.+)\/(.*)/;

// regex for valid CSS color values
const COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

type CloudflareOptions = {
  width?: number;
  height?: number;
  quality?: number;
  // format?: string;
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
  background?: string;
  // gravity?: string;
  // blur can be a number between 1 and 250
  blur?: number;
  brightness?: number;
  compression?: "fast";
  contrast?: number;
  dpr?: number;
  gamma?: number;
  rotate?: 90 | 180 | 270;
  trim?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  sharpen?: number;
};

type ImageProps = {
  image: ComplexImageType | ImageType;
  placeholder?: React.ReactNode;
  options?: CloudflareOptions;
  className?: string;
};

export const buildImageUrl = (
  imageUrl: string,
  options?: CloudflareOptions
): string => {
  // if blur is an option, make sure it is in between 1 and 250
  if (options?.blur && (options.blur < 1 || options.blur > 250)) {
    console.warn("Blur prop must be a number between 1 and 250");
    // remove the blur option
    delete options.blur;
  }

  // if rotate is an option, make sure it is 90, 180, or 270
  if (options?.rotate && ![90, 180, 270].includes(options.rotate)) {
    console.warn("Rotate prop must be 90, 180, or 270");
    // remove the rotate option
    delete options.rotate;
  }

  // if sharpen is an option, make sure it is in between 1 and 10
  if (options?.sharpen && (options.sharpen < 1 || options.sharpen > 10)) {
    console.warn("Sharpen prop must be a number between 1 and 10");
    // remove the sharpen option
    delete options.sharpen;
  }

  // if quality is an option, make sure it is in between 1 and 100
  if (options?.quality && (options.quality < 1 || options.quality > 100)) {
    console.warn("Quality prop must be a number between 1 and 100");
    // remove the quality option
    delete options.quality;
  }

  // format trim into a string of the form 20;30;20;0 where the number is 0 if not specified
  let trim = "";
  if (options?.trim) {
    const { top, right, bottom, left } = options.trim;
    trim = `${top ?? 0};${right ?? 0};${bottom ?? 0};${left ?? 0}`;
  }

  // check if background is a valid CSS color value
  if (options?.background && !COLOR_REGEX.test(options.background)) {
    console.warn("Background prop must be a valid CSS color value");
    // remove the background option
    delete options.background;
  }

  let baseUrl = imageUrl;
  const uuid = getImageUUID(baseUrl);

  // change the a.mktgcdn.com in the url to dyn.mktgcdn.com and drop the dimensions and extension from the end of the url
  baseUrl = baseUrl.replace("a.mktgcdn.com", "dyn.mktgcdn.com");
  // remove the dimensions and extension from the end of the url
  baseUrl = baseUrl.replace(/\/\d+x\d+\.\w+$/, "");

  // built the options string
  if (options) {
    const {
      width,
      height,
      quality,
      // format,
      fit,
      background,
      // gravity,
      // blur,
      brightness,
      compression,
      contrast,
      dpr,
      rotate,
      // trim,
      sharpen,
      blur,
    } = options;

    const optionsArray = [
      width && `width=${width}`,
      height && `height=${height}`,
      quality && `quality=${quality}`,
      // format && `format=${format}`,
      fit && `fit=${fit}`,
      background && `background=${background}`,
      // gravity && `gravity=${gravity}`,
      // blur && `blur=${blur}`,
      brightness && `brightness=${brightness}`,
      compression && `compression=${compression}`,
      contrast && `contrast=${contrast}`,
      dpr && `dpr=${dpr}`,
      rotate && `rotate=${rotate}`,
      trim && `trim=${trim}`,
      sharpen && `sharpen=${sharpen}`,
      blur && `blur=${blur}`,
    ].filter(Boolean);

    if (optionsArray.length > 0) {
      baseUrl = `${baseUrl}/${optionsArray.join(",")}`;
    }
  }
  return baseUrl;
};

export const getImageUUID = (url: string) => {
  const matches = url.match(MKTGCDN_URL_REGEX);

  if (!matches?.groups?.uuid) {
    console.error(`Invalid image url: ${url}.`);
    return "";
  }

  return matches.groups.uuid;
};

// export const Image = ({
//   image,
//   options,
//   placeholder,
//   className,
// }: ImageProps) => {
//   const imgRef = useRef<HTMLImageElement>(null);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   useEffect(() => {
//     if (imgRef.current?.complete) {
//       setIsImageLoaded(true);
//     }
//   }, []);

//   const url = buildImageUrl(image, options);
//   const alt =
//     "image" in image ? image.image.alternateText : image.alternateText;

//   // Generate Image Sourceset
//   // const srcSet: string = widths
//   //   .map((w) => `${buildImageUrl(image)} ${w}w`)
//   //   .join(", ");

//   // Generate Image Sizes
//   // const maxWidthBreakpoints = [640, 768, 1024, 1280, 1536];
//   // const sizes: string = widths
//   //   .map((w, i) =>
//   //     i === widths.length - 1
//   //       ? `${w}px`
//   //       : `(max-width: ${maxWidthBreakpoints[i]}px) ${w}px`
//   //   )
//   //   .join(", ");

//   return (
//     <>
//       {!isImageLoaded && placeholder != null && placeholder}
//       <img
//         className={className}
//         ref={imgRef}
//         src={url}
//         alt={alt}
//         // srcSet={srcSet}
//       />
//     </>
//   );
// };
