/*
 * @Author: liu7i
 * @Date: 2022-08-05 16:49:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 17:26:09
 */

import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Input, Button, InputNumber, Tooltip } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";
import Actions from "./modules/Actions";
import type { IHomeProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import "./index.scss";

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();

  return (
    <div className="pageHome">
      <Card
        tabList={[
          { key: "0", tab: "待办事项" },
          { key: "1", tab: "已完成" },
        ]}
        onTabChange={(item) => {
          console.log(item);
        }}
        extra={<div>lal</div>}
        actions={[<Actions />]}
      >
        暂时待办事项
      </Card>
    </div>
  );
});

export default observer(function HomePage(props: IHomeProps) {
  return (
    <Provider>
      <Home {...props} />
    </Provider>
  );
});

export * from "./interface";
