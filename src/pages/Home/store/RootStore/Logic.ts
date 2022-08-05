/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:30:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 17:54:19
 */

import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { ITodo } from "../../interface";
import { message } from "antd";
import moment from "moment";
import { v4 } from "uuid";
import { getJSONToParse } from "utils/Tools";
import type { IJsonString } from "utils/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  todoList: ITodo[] = [];
  currentTodo: Partial<ITodo> = {};
  changeCurrentToDo(item: Partial<ITodo>) {
    this.currentTodo = Object.assign({}, this.currentTodo, item);
  }

  saveChange() {
    this.todoList = this.todoList.map((i) => {
      if (i.uuid !== this.currentTodo.uuid) {
        return i;
      }
      return { ...i, ...this.currentTodo };
    });
    this.saveData();
  }

  addTodo() {
    if (!this.currentTodo.content) {
      message.warn("请输入待办事项内容");
      return;
    }

    const todo: ITodo = Object.assign(
      {
        uuid: v4(),
        index: 9999,
        createDate: moment().format("YYYY-MM-DD"),
        updateDate: Date.now(),
        status: 0,
      },
      this.currentTodo
    ) as ITodo;

    this.todoList.push(todo);
    this.currentTodo = {};
    this.saveData();
  }

  changeToDo(item: ITodo) {
    this.currentTodo = item;
  }

  cannelTodo(item: ITodo) {
    this.todoList = this.todoList.map((i) => {
      if (i.uuid !== item.uuid) {
        return i;
      }
      return { ...i, status: 2 };
    });
    this.saveData();
  }

  changeStatus(item: ITodo) {
    this.todoList = this.todoList.map((i) => {
      if (i.uuid !== item.uuid) {
        return i;
      }
      let status = i.status;

      if (status === 0) {
        status = 1;
      } else if (status === 1) {
        status = 0;
      }

      return { ...i, status };
    });
    this.saveData();
  }

  initTodo() {
    const oldList = localStorage.getItem("todoList") as IJsonString<ITodo[]>;
    if (!oldList) {
      return;
    }
    const data = getJSONToParse(oldList);
    this.todoList = data || [];
  }

  saveData() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }
}
