import React from "react";
import { PinComponent, Coordinate } from "@yext/search-ui-react";
import ReactDOM from "react-dom";
import { Popup, LngLatLike } from "mapbox-gl";
import Location from "../../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { Result } from "@yext/search-headless-react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

const PinPopup = (location: Location) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex text-gray-400">
        <div>
          <a
            target={"_blank"}
            href={location.slug}
            className="font-semibold text-sky-400 text-sm"
            rel="noreferrer"
          >
            {location.address.city}
          </a>
          <p className="text-sm">{`${location.address.line1}`}</p>
          <p className="text-sm">{`${formatPhoneNumber(
            location.mainPhone
          )}`}</p>
        </div>
      </div>
    </div>
  );
};

// transforms the Yext Display Coordiate into the format that Mapbox expects
const transformToMapboxCoord = (coordinate?: Coordinate): LngLatLike => {
  if (!coordinate) return [0, 0];

  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

// TODO: ask Baigel if this can can be exported from the SDK
type MapPinProps = {
  index: number;
  mapbox: mapboxgl.Map;
  result: Result<Location>;
};

const MapPin: PinComponent<Location> = ({
  index,
  mapbox,
  result,
}: MapPinProps) => {
  // grab the coordinates from the result
  const yextCoordinate = result.rawData.yextDisplayCoordinate;

  // manage the open state of the popup with useState and useRef
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    // render the popup on the map when the active state changes
    if (active && yextCoordinate) {
      const popupNode = document.createElement("div");
      ReactDOM.render(PinPopup(result.rawData), popupNode);
      popupRef.current
        .setLngLat(transformToMapboxCoord(yextCoordinate))
        .setDOMContent(popupNode)
        .addTo(mapbox);
    }
  }, [active, mapbox, result, yextCoordinate]);

  // create a callback to open the popup on click
  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    // return the pin component with the onClick handler
    <MapPinIcon className="text-sky-400 h-8 w-8" onClick={handleClick} />
  );
};

export default MapPin;
