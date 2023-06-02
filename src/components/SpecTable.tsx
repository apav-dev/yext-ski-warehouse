import * as React from "react";

export interface SpecTableProps {
  title?: string;
  items: {
    name?: string;
    values?: string[];
  }[];
}

export const SpecTable = ({ title, items }: SpecTableProps) => {
  return (
    <>
      <h2
        id="specs-heading"
        className="text-lg font-medium text-gray-900 border-b border-gray-300 pb-4"
      >
        {title}
      </h2>
      <table className="min-w-full divide-y divide-gray-300">
        <tbody className="divide-y divide-gray-200">
          {items.map((spec: { name?: string; values?: string[] }, i) => (
            <tr
              key={spec.name}
              className={i % 2 === 0 ? "even:bg-gray-50" : ""}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {spec.name}
              </td>

              {spec.values?.map((value) => (
                <td
                  key={value}
                  className="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
