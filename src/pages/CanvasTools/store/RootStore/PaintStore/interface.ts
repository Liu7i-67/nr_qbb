/*
 * @Author: liu7i
 * @Date: 2022-07-14 18:02:25
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-14 18:11:23
 */

import { RootStore } from "../";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { TLoadingStore, EPaintMode, IPoint } from "../interface";

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 绘画类型 */
  paintMode: EPaintMode;
  /** @param 是否处于绘制中 */
  paintStatus: boolean;
  /** @param 绘制信息 */
  pointList: IPoint[];
  /** @function 开始绘画 */
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  /** @function 绘画 */
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  /** @function 绘画结束 */
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  /** @function 画笔离开画布后 */
  onMouseLeave: () => void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IPaintStore {
  logic: Logic;
  computed: Computed;
}
