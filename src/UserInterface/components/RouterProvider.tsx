import React, { useState } from "react";
import { Router } from "./Router";

interface Props {
  routers: string[];
}

interface Toggle {
  open: boolean;
}

type Toggles = Record<string, Toggle>;

function initToggles(names: string[]): Toggles {
  const toggles: Toggles = {};

  names.forEach((name) => {
    toggles[name] = { open: false };
  });

  return toggles;
}

export const RouterProvider: React.FC<Props> = ({ routers }) => {
  const [toggles, setToggles] = useState<Toggles>(initToggles(routers));

  const openAll = () => {
    const newToggles = { ...toggles };
    routers.forEach((router) => {
      newToggles[router].open = true;
    });
    setToggles(newToggles);
  };

  return (
    <div>
      <button onClick={openAll}>Open All</button>
      {routers.map((router) => (
        <Router
          key={router}
          name={router}
          open={toggles[router].open}
          onClick={() =>
            setToggles({
              ...toggles,
              [router]: { open: !toggles[router].open },
            })
          }
        />
      ))}
    </div>
  );
};
