/*
 * @Author: liu7i
 * @Date: 2022-07-15 10:11:03
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 11:05:02
 */

import { RootStore } from "../";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { TLoadingStore, IArea, EPaintMode, ISnapshot } from "../interface";

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 快照信息-存储20条 */
  snapshots: ISnapshot[];
  /** @function 清空画布指定区域 */
  clearCtx: (position?: Partial<IArea>) => void;
  /** @function 清空整个画布 */
  clearAll: () => void;
  /** @function 改变绘画类型 */
  changePaintMode: (newMode: EPaintMode) => void;
  /** @function 保存快照 */
  saveSnapshot: (position?: Partial<IArea>) => void;
  /** @function 撤销/回退 */
  revoke: (index?: number) => void;
  /** @function 导出画布 */
  exportCtx: () => void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IToolStore {
  logic: Logic;
  computed: Computed;
}
