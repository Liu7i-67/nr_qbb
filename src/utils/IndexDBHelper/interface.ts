/*
 * @Author: liu7i
 * @Date: 2022-07-21 10:05:21
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-22 13:49:12
 */

import { IAny } from "../interface";
import type { EConnect, EStatus } from "./enum";

export interface IDBItem {
  /** @param 数据库名称 */
  name: string;
  /** @param 连接状态 */
  status: EConnect;
  /** @param 链接对象 */
  db?: IDBOpenDBRequest;
  /** @param 包含的对象仓库 */
  table: ITableItem[];
  /** @param 版本号 */
  version: number;
}

export interface ITableItem {
  name: string;
  otherSetting?: IOtherSetting;
  index: IIndex[];
  initData: IAny[];
}

export interface IOtherSetting {
  /** @param 主键 */
  keyPath: string;
  /** @param 是否自增 */
  autoIncrement?: boolean;
}

export interface IWaitingItem {
  /** @param 操作 */
  option: Function;
  /** @param 请求参数 */
  params?: IAny[];
}

export interface IIndex {
  /** @param 要使用的索引的关键路径 */
  key: string;
  /** @param 要创建的索引的名称 */
  name: string;
  otherSetting: IIndexOtherSetting;
}

export interface IIndexOtherSetting {
  /** @param 是否唯一 */
  unique: boolean;
  multiEntry?: boolean;
}

export type TRes = Promise<{ code: EStatus; data?: IAny[] }>;

export interface ISearchConfig {
  /** @param 搜索区间开始边界 */
  startIndex?: {
    /** @param 开始边界主键 */
    index: string | number;
    /** @param 是否包含边界自身 */
    includeOwn?: boolean;
  };
  /** @param 搜索区间结束边界 */
  endIndex?: {
    /** @param 结束边界主键 */
    index: string | number;
    /** @param 是否包含边界自身 */
    includeOwn?: boolean;
  };
  /** @param 是否需要倒序查询 */
  needPrev?: boolean;
  /** @param 需要查询多少条 */
  pageSize?: number;
  /** @param 查询第几页 */
  current?: number;
  /** @param 查询的字段信息 */
  keys?: IAny;
}
