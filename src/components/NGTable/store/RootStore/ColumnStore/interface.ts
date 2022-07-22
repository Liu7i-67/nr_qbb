/*
 * @Author: liu7i
 * @Date: 2022-04-25 11:02:45
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 16:25:13
 */

import { RootStore } from "../";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { TLoadingStore } from "../interface";
import { IColumns } from "../../../interface";

/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 设置弹框显示状态 */
  visible: boolean;
  /** @function 打开设置弹框 */
  openModal: () => void;
  /** @function 关闭设置弹框 */
  closeModal: () => void;
  /** @param 当前选中的列表项 */
  columnVisibility: string[];
  /** @function 改变当前选中的列表项 */
  changeColumnVisibility: (values: string[]) => void;
  /** @function 全选 */
  checkAll: () => void;
  /** @function 保存修改 */
  saveChange: () => void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  /** @param 可选字段信息 */
  columnKeys: IColumns[];
  /** @param 是否有选中 */
  checked: boolean;
  /** @param 是否已全选 */
  checkedAll: boolean;
}

/** 根Store接口 */
export interface IColumnStore {
  logic: Logic;
  computed: Computed;
}
