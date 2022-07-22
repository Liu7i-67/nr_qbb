/*
 * @Author: liu7i
 * @Date: 2022-04-20 17:40:18
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 16:43:56
 */
import { IColumns, IRowItem } from "./columns";
import {
  TableInstance,
  Overwrite,
  DefaultGenerics,
} from "@tanstack/react-table";

export interface INGTableProps {
  /** @function 绑定ref的方法,给class组件使用 */
  onRef?: (ref: INGTableRef) => void;
  /** @parma 列配置 */
  columns: IColumns[];
  /** @param 数据源 */
  dataSource: IRowItem[];
  /** @param 唯一标识符 默认为id */
  rowKey?: string;
  /** @param 表格实例 */
  instance?: TableInstance<any>;
}

export interface INGTableRef {}

export interface IPropsStore extends INGTableProps {}

export type { IColumns, IRowItem };

/** @param 不需要处理的字段 */
export const ignoreKeys: string[] = ["key", "option", "options"];
