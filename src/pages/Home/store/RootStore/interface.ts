/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:30:40
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 17:53:04
 */

import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITodo } from "../../interface";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  todoList: ITodo[];
  /** @parma 编辑中的todo */
  currentTodo: Partial<ITodo>;
  /** @function 修改当前编辑的todo */
  changeCurrentToDo: (item: Partial<ITodo>) => void;
  /** @function 保存修改 */
  saveChange: () => void;
  /** @function 新增待办事项 */
  addTodo: () => void;
  /** @function 修改待办事项 */
  changeToDo: (item: ITodo) => void;
  /** @function 废弃待办事项 */
  cannelTodo: (item: ITodo) => void;
  /** @function 初始化读取待办事项 */
  initTodo: () => void;
  /** @function 保存当前todoList到缓存 */
  saveData: () => void;
  /** @function 修改待办状态 已完成->待办 or 待办->已完成 */
  changeStatus: (item: ITodo) => void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
}
