import * as React from "react";
import { formatPhoneNumber } from "../utils/formatPhoneNumber";

export interface DetailsProps {
  address: any;
  phone?: string;
}

const StoreDetails = ({ address, phone }: DetailsProps) => {
  return (
    <>
      <div className="p-2 px-4 py-5 sm:p-6">
        <div className="grid gap-y-3 text-gray-900">
          <div className="text-4xl font-semibold text-sky-400">{`${address.city}, ${address.region}`}</div>
          <div>
            <p>{`${address.line1}`}</p>
            <p>{`${address.city}, ${address.region} ${address.postalCode}`}</p>
          </div>
          {phone && (
            <span>
              <a href={`tel:${phone}`} className="hover:underline">
                {formatPhoneNumber(phone)}
              </a>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default StoreDetails;
