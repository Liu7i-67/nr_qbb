import React from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import type { IRouterProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const Router = observer(function Router_(props: IRouterProps) {
  const root = useStore();

  return <div>Router</div>;
});

export default observer(function RouterPage(props: IRouterProps) {
  return (
    <Provider>
      <Router {...props} />
    </Provider>
  );
});

export * from "./interface";
