import * as React from "react";
import { Address } from "../types/Address";
import Cta from "./Cta";
import { Image } from "@yext/pages/components";


export interface BannerProps {
    name?: string;
    address?: Address;
    image?: any;
}

const renderPrettyAddress = (address?: Address) => {
    return (
        <>
            {address && (
                <span>
                    {address.line1} in {address.city}, {address.region}
                </span>
            )}
        </>
    );
};

const Banner = (props: BannerProps) => {
    const { name, address, image } = props;
    console.log("photoUrl", image.url)

    return (
        <>
            <div
                className={`relative z-5 w-half bg-cover bg-center h-96 `}
            >
                <Image
                    image={image}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end  overflow-hidden sm:rounded-lg p-4">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gray-900 opacity-60"
                    />
                </div>
                <div className="absolute left-0 right-0 flex flex-col items-center">
                    <div className="w-96 my-8 rounded-xl bg-sky-500 border-8 shadow-xl border-sky-600 px-4 py-2 text-center">
                        <div>
                            <h1 className="text-white text-3xl font-semibold">{name}</h1>
                            <p className="text-lg pt-2 text-white font-semibold">
                                {renderPrettyAddress(address)}
                            </p>
                        </div>
                        <div className="flex py-3 justify-between">
                            <Cta
                                buttonText="Visit Us Today"
                                url="#"
                                style="text-orange bg-white"
                            ></Cta>
                            <Cta
                                buttonText="See Products"
                                url="#"
                                style="text-orange bg-white"
                            ></Cta>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;