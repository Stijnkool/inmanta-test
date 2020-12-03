import React from "react";

interface Props {
  interfaces: string[];
}

export const Details: React.FC<Props> = ({ interfaces }) => {
  return (
    <div>
      {interfaces.map((name) => (
        <p>{name}</p>
      ))}
    </div>
  );
};