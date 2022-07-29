/*
 * @Author: liu7i
 * @Date: 2022-07-29 09:43:46
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-29 09:44:16
 */
import { ITableItem } from "../interface";

export const todoTable: ITableItem = {
  name: "todo",
  otherSetting: {
    keyPath: "id",
    autoIncrement: true,
  },
  index: [
    {
      key: "date",
      name: "date",
      otherSetting: { unique: false },
    },
    {
      key: "title",
      name: "title",
      otherSetting: { unique: false },
    },
    {
      key: "index",
      name: "index",
      otherSetting: { unique: false },
    },
    {
      key: "status",
      name: "status",
      otherSetting: { unique: false },
    },
  ],
  initData: [
    {
      id: 1,
      date: "2022-07-29",
      title: "完成todoList",
      index: 0,
      status: false,
    },
  ],
};
