/*
 * @Author: liu7i
 * @Date: 2022-04-20 10:45:42
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-22 14:19:08
 */

import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { RootStore } from "./";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IRecordItem } from "../../useColumns";

export type TLoadingStore = LoadingStore<"loading">;

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 数据 */
  dataSource: IRecordItem[];
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
