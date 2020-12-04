import React from "react";
import { useSelector } from "react-redux";
import {
  selectInterfacesById,
  getInterfacesForRouter,
} from "UserInterface/slices";
import { Interface } from "./Interface";

interface Props {
  routerId: string;
}

export const InterfaceList: React.FC<Props> = ({ routerId }) => {
  const interfaces = useSelector(selectInterfacesById);
  const filtered = getInterfacesForRouter(interfaces, routerId);
  return (
    <div>
      {filtered.map((iface) => (
        <Interface key={iface.id} data={iface} routerId={routerId} />
      ))}
    </div>
  );
};
