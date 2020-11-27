import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { initRouters, selectData } from "features/routers/routerSlice";
import { RemoteData } from "Core/Language";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    dispatch(initRouters());
  }, [dispatch]);

  if (!RemoteData.isSuccess(data)) return null;
  const routers = data.value;

  return (
    <div>
      {routers.map((router) => (
        <Router
          key={router}
          name={router}
          onClick={() => {
            console.log(router);
          }}
        />
      ))}
      <hr />
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
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
