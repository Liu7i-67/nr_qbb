/*
 * @Author: liu7i
 * @Date: 2022-08-08 10:43:16
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 11:12:48
 */

import React, { useMemo } from "react";
import { Button, Tag } from "antd";
import { ITodo } from "../index";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

interface IProps {
  item: ITodo;
}

const ToDoItem = observer(function ToDoItem_(props: IProps) {
  const root = useStore();
  const { item } = props;

  const Options = useMemo(() => {
    switch (item.status) {
      case 0: {
        return (
          <span>
            <Button
              type="link"
              onClick={() => {
                root.logic.changeStatus(item);
              }}
            >
              完成
            </Button>
            <Button
              type="link"
              onClick={() => {
                root.logic.changeCurrentToDo(item);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                root.logic.cannelTodo(item);
              }}
            >
              作废
            </Button>
          </span>
        );
      }
      case 1: {
        return (
          <span>
            <Button
              type="link"
              onClick={() => {
                root.logic.changeStatus(item);
              }}
            >
              转待办
            </Button>
          </span>
        );
      }
      case 2: {
        return (
          <span>
            <Button
              type="link"
              onClick={() => {
                root.logic.changeStatus(item);
              }}
            >
              转待办
            </Button>
          </span>
        );
      }
    }
  }, [item.status]);

  return (
    <div className="flex_a jsb">
      <span>
        <span className="fwb">{item.content}</span>
        <Tag className="ml-12" color="#2db7f5">
          创建时间：{item.createDate}
        </Tag>
        <Tag color="#87d068">优先级：{item.index}</Tag>
      </span>
      {Options}
    </div>
  );
});

export default ToDoItem;
