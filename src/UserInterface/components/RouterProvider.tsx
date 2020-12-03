import React, { useState } from "react";

export interface RouterProps {
  name: string;
  open: boolean;
  onClick(): void;
}

interface Props {
  routers: string[];
  Router: React.FC<RouterProps>;
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

export const RouterProvider: React.FC<Props> = ({ routers, Router }) => {
  const [toggles, setToggles] = useState<Toggles>(initToggles(routers));

  const openAll = () => {
    const newToggles = { ...toggles };
    routers.forEach((router) => {
      newToggles[router].open = true;
    });
    setToggles(newToggles);
  };

  const triggerToggle = (router: string) => () => {
    setToggles({
      ...toggles,
      [router]: { open: !toggles[router].open },
    });
  };

  return (
    <div>
      <button onClick={openAll}>Open All</button>
      {routers.map((router) => (
        <Router
          key={router}
          name={router}
          open={toggles[router].open}
          onClick={triggerToggle(router)}
        />
      ))}
    </div>
  );
};
