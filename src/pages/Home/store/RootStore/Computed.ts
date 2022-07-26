/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:52:12
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 13:40:09
 */

import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get todoList() {
    const { logic } = this.rootStore;

    let resData = logic.todoList.filter((i) => i.status === logic.status);

    if (logic.searchValue.useSearch) {
      resData = resData.filter(
        (i) =>
          i.content.includes(logic.searchValue.content) &&
          i.createDate.includes(logic.searchValue.createDate)
      );
    }

    return resData;
  }
}
