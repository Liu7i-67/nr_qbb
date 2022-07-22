/*
 * @Author: liu7i
 * @Date: 2022-04-24 15:04:21
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 16:43:20
 */

import { LoadingStore } from "@quarkunlimit/qu-mobx";
import {
  ColumnPinningState,
  VisibilityState,
  OnChangeFn,
} from "@tanstack/react-table";
import { RootStore } from "../";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { TLoadingStore } from "../interface";
import { IPropsStore } from "../../../interface";

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 列表左右固定信息 */
  columnPinning: ColumnPinningState;
  /** @param 列表项展示字段 */
  columnVisibility?: VisibilityState;
  /** @parma 显示模式 防止表格配置宽度不够时留白和表格可见区域过小时固定列显示异常 */
  showMode: "auto" | "fit-content";
  /** @function 初始化表格列配置信息 */
  initColumns: (column: IPropsStore["columns"]) => void;
  /**
   * @function 调整显示模式
   * @param tableWidth 表格可见区域宽度
   * @param columnWidth 表格配置列宽度
   */
  changeShowMode: (tableWidth: number, columnWidth: number) => void;
  /** @function 改变列表项展示字段 */
  changeColumnVisibility: OnChangeFn<VisibilityState>;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  /** @param 是否有固定信息 */
  isSplit: boolean;
  /** @param 是否有左固定信息 */
  isLeftSplit: boolean;
  /** @param 是否有右固定信息 */
  isRightSplit: boolean;
}

/** 根Store接口 */
export interface IMainStore {
  logic: Logic;
  computed: Computed;
}
