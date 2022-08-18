/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:30:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 13:43:39
 */

import { makeAutoObservable, toJS } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { ISearchValue, ITodo } from "../../interface";
import { message } from "antd";
import moment from "moment";
import { v4 } from "uuid";
import { getJSONToParse } from "utils/Tools";
import type { IJsonString } from "utils/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  searchValue: ISearchValue = { content: "", useSearch: "", createDate: "" };
  status: number = 0;
  todoList: ITodo[] = [];
  currentTodo: Partial<ITodo> = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeSearchValue(key: keyof ISearchValue, value: string) {
    this.searchValue[key] = value;
  }

  search() {
    this.searchValue.useSearch = "true";
  }

  resetSearch() {
    this.searchValue = { content: "", useSearch: "", createDate: "" };
  }

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
    this.currentTodo = {};
    message.success("编辑成功");
    this.saveData();
  }

  cannelEdit() {
    this.currentTodo = {};
  }

  addTodo() {
    if (!this.currentTodo.content) {
      message.warn("请输入待办事项内容");
      return;
    }

    if (this.currentTodo.uuid) {
      this.saveChange();
      return;
    }

    const todo: ITodo = Object.assign(
      {},
      {
        uuid: v4(),
        index: 9999,
        createDate: moment().format("YYYY-MM-DD"),
        status: 0,
      },
      this.currentTodo
    ) as ITodo;

    this.todoList = this.todoList.concat([todo]);
    this.currentTodo = {};
    message.success("新增成功");
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
      } else if (status === 2) {
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
    this.todoList = this.todoList.sort((i, j) => i.index - j.index);
  }

  saveData() {
    this.todoList = this.todoList.sort((i, j) => i.index - j.index);
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

  changeCurrentStatus(status: number) {
    this.status = status;
  }
}
