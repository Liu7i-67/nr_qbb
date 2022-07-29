/*
 * @Author: liu7i
 * @Date: 2022-07-29 09:34:08
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-29 09:37:31
 */

import React from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore, Provider } from "./store/RootStore";
import "./index.scss";

const Page = observer(function Page_() {
  return <div className="Page-TodoList">todoList</div>;
});

export default observer(function PageToDoList() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
});
