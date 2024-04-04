import React from "react";

interface CardProps {
  title: string;
  id: number;
  description: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card: React.FC<CardProps> = ({ description, title, id }) => (
  <a
    href="#"
    className=" block max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    data-testid="card"
  >
    <h5
      className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white  overflow-hidden overflow-ellipsis"
      style={{ wordWrap: "break-word" }}
    >
      {title}
    </h5>
    <p
      className="font-normal text-xs text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis"
      style={{ wordWrap: "break-word" }}
    >
      {description}
    </p>
  </a>
);

export default Card;
