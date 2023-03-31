import { CardProps } from "@yext/search-ui-react";
import React from "react";
import Ce_video from "../../types/videos";
import { Image } from "@yext/pages/components";

const VideoCard = ({ result }: CardProps<Ce_video>) => {
  const video = result.rawData;

  return (
    <div key={video.id} className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        {video.c_videoThumbnail && (
          <Image
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            image={video.c_videoThumbnail}
          />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="group relative">
          {/* TODO:  add link to video */}
          <h3 className="mt-3 text-lg font-semibold leading-6 text-sky-400 group-hover:text-sky-700">
            <span className="absolute inset-0" />
            {video.name}
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
            {video.c_videoDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
