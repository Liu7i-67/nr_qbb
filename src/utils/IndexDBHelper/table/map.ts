/*
 * @Author: liu7i
 * @Date: 2022-07-29 09:42:08
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-29 09:43:35
 */

import { ITableItem } from "../interface";

export const mapTable: ITableItem = {
  name: "map",
  otherSetting: {
    keyPath: "id",
    autoIncrement: true,
  },
  index: [
    {
      key: "name",
      name: "name",
      otherSetting: { unique: true },
    },
  ],
  initData: [
    {
      name: "南天门",
      id: 1,
    },
    {
      name: "九重天",
      id: 2,
    },
  ],
};
