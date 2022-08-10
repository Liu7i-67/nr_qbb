import React from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import type { IAdvancedSearchProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const AdvancedSearch = observer(function AdvancedSearch_(
  props: IAdvancedSearchProps
) {
  const root = useStore();

  return <div>AdvancedSearch</div>;
});

export default observer(function AdvancedSearchPage(
  props: IAdvancedSearchProps
) {
  return (
    <Provider>
      <AdvancedSearch {...props} />
    </Provider>
  );
});

export * from "./interface";
