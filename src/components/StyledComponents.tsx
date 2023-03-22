import React from "react";
import { FaSnowflake } from "react-icons/fa";

export const StyledComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="prose text-7xl text-sky-400 font-bold my-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="prose text-2xl font-bold my-4 text-sky-400">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="prose text-xl font-bold my-4 text-sky-400">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 prose lg:prose-lg prose-stone">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-none list-inside my-4 px-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="prose list-decimal list-inside my-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="list-none list-inside">
      <SnowflakeIcon />
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="prose text-4xl text-sky-400 font-medium  py-4 px-6 my-6 before:text-sky-400">
      {children}
    </blockquote>
  ),
  em: ({ children }: { children: React.ReactNode }) => (
    <em className="font-semibold text-sky-400 text-3xl">{children}</em>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  img: ({ ...props }) => (
    <img className="w-full my-4 rounded-lg sm:px-16 h-[600px]" {...props} />
  ),
};

const SnowflakeIcon = () => (
  <FaSnowflake className="inline-block text-sky-400 mr-2" />
);
