/*
 * @Author: liu7i
 * @Date: 2022-07-22 11:27:39
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-22 11:36:21
 */

import type { IAny } from "../interface";
import type { ITableItem } from "./interface";

/**
 * @function 判断是否符合搜索条件
 * @param values 目标值
 * @param search 搜索参数
 * @param table 对象表信息
 */
export const canPush = (values: IAny, table: ITableItem, search?: IAny) => {
  if (typeof search !== "object") {
    return true;
  }

  let _canPush = true;
  Object.keys(search).forEach((i) => {
    if (table.index.find((j) => j.key === i)) {
      const target = values[i];
      const searchVal = search[i];

      switch (typeof target) {
        case "string":
          {
            if (!target.includes(searchVal)) {
              _canPush = false;
            }
          }
          break;
        case "number":
          {
            if (target !== searchVal) {
              _canPush = false;
            }
          }
          break;
        default: {
          if (Array.isArray(target)) {
            if (!target.includes(searchVal)) {
              _canPush = false;
            }
          }
        }
      }
    }
  });

  return _canPush;
};
