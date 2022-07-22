/*
 * @Author: liu7i
 * @Date: 2022-04-13 17:03:00
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 10:12:04
 */

import React from "react";
import { Button, Table } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore, Provider } from "./store/RootStore";
import NGTable from "components/NGTable";
import { useColumns } from "./useColumns";
import "./index.scss";

const Home = observer(() => {
  const root = useStore();
  const columns = useColumns();
  return (
    <div className="page-home">
      <NGTable columns={columns.getList} dataSource={root.logic.dataSource} />
    </div>
  );
});

export default observer(() => (
  <Provider>
    <Home />
  </Provider>
));
