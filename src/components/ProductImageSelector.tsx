import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Slider, { Settings } from "react-slick";
import { v4 as uuid } from "uuid";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Image, ComplexImageType, ImageType } from "@yext/pages/components";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface CarouselProps {
  images?: ComplexImageType[] | ImageType[];
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <ChevronRightIcon
      className={className}
      style={{
        ...style,
        height: "50px",
        width: "30px",
        color: "#38BDF8",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <ChevronLeftIcon
      style={{
        ...style,
        height: "50px",
        width: "30px",
        color: "#38BDF8",
        zIndex: 10,
      }}
      className={className}
      // color="#F85E00"
      // size={50}
      onClick={onClick}
    />
  );
};

const BeverageCarousel = ({ images }: CarouselProps) => {
  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: false,
          slidesToScroll: 2,
          swipeToSlide: true,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };

  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List>
          <Slider {...settings}>
            {images?.map((image) => (
              <Tab
                key={uuid()}
                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white hover:bg-gray-50"
              >
                {({ selected }) => (
                  <>
                    <span
                      className={twMerge(
                        "absolute inset-0 overflow-hidden rounded-md m-2 shadow-lg border ",
                        selected ? "border-sky-400" : "border-transparent"
                      )}
                    >
                      <Image
                        image={image}
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                  </>
                )}
              </Tab>
            ))}
          </Slider>
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-w-1 aspect-h-1 w-full my-4">
        {images?.map((image) => (
          <Tab.Panel key={uuid()}>
            <Image
              image={image}
              className="h-full w-full object-cover object-center sm:rounded-lg shadow-lg"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default BeverageCarousel;
