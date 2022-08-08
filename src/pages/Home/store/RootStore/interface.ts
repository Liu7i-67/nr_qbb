/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:30:40
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 13:38:23
 */

import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITodo, ISearchValue } from "../../interface";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 当前查看的状态 */
  status: number;
  /** @param 改变当前查看的状态 */
  changeCurrentStatus: (status: number) => void;
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
  /** @function 取消编辑 */
  cannelEdit: () => void;
  /** @param 搜索内容 */
  searchValue: ISearchValue;
  /** @function 修改搜索内容 */
  changeSearchValue: (key: keyof ISearchValue, value: string) => void;
  /** @function 搜索  **/
  search: () => void;
  /** @function 重置搜索 */
  resetSearch: () => void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  todoList: ITodo[];
}

/** 根Store接口 */
export interface IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
}
