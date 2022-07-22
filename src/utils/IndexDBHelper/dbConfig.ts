/*
 * @Author: liu7i
 * @Date: 2022-07-21 15:33:57
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-21 16:08:03
 */
import { ITableItem } from "./interface";

export const dbConfig = {
  name: "qbb",
  table: [
    {
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
    },
  ] as ITableItem[],
};
