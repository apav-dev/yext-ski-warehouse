import * as React from "react";

export interface TableProps {
  title?: string;
  items: {
    name?: string;
    value?: string;
  }[];
}

export const Table = ({ title, items }: TableProps) => {
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
          {items
            .filter(
              (spec: { name?: string; value?: string }) =>
                spec.name && spec.value
            )
            .map((spec: { name?: string; value?: string }) => (
              <tr key={spec.name}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {spec.name}
                </td>
                <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                  {spec.value}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
