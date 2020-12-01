import React from "react";
import { useSelector } from "react-redux";
import { selectData } from "features/routers/routerSlice";
import { RemoteData } from "Core/Language";

export const App: React.FC = () => {
  const data = useSelector(selectData);

  if (!RemoteData.isSuccess(data)) return null;
  const routers = data.value;

  return (
    <div>
      {routers.map((router) => (
        <Router key={router} name={router} onClick={() => {}} />
      ))}
      <hr />
      {/* <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre> */}
    </div>
  );
};

interface RouterProps {
  name: string;
  onClick(): void;
}

const Router: React.FC<RouterProps> = ({ name, onClick }) => (
  <div onClick={onClick}>{name}</div>
);
