/*
 * @Author: liu7i
 * @Date: 2022-08-05 16:49:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 11:20:53
 */

import React, { useEffect } from "react";
import { Card, List } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";
import Actions from "./modules/Actions";
import ToDoItem from "./modules/ToDoItem";
import Search from "./modules/Search";
import type { IHomeProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import "./index.scss";

const Home = observer(function Home_(props: IHomeProps) {
  const root = useStore();

  useEffect(() => {
    root.logic.initTodo();
  }, []);

  return (
    <div className="pageHome">
      <Card
        tabList={[
          { key: "0", tab: "待办事项" },
          { key: "1", tab: "已完成" },
          { key: "2", tab: "已作废" },
        ]}
        onTabChange={(item) => {
          root.logic.changeCurrentStatus(+item ?? 0);
        }}
        actions={[<Actions />, <Search />]}
      >
        <List
          dataSource={root.computed.todoList}
          locale={{ emptyText: "暂无待办事项" }}
          renderItem={(item) => <ToDoItem item={item} />}
        />
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
