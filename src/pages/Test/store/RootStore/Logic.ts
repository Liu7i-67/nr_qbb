/*
 * @Author: liu7i
 * @Date: 2022-04-20 13:39:31
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 13:40:21
 */

import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IPerson } from "../../interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IPerson[] = [
    {
      firstName: "tanner",
      lastName: "linsley",
      age: 24,
      visits: 100,
      status: "In Relationship",
      progress: 50,
    },
    {
      firstName: "tandy",
      lastName: "miller",
      age: 40,
      visits: 40,
      status: "Single",
      progress: 80,
    },
    {
      firstName: "joe",
      lastName: "dirte",
      age: 45,
      visits: 20,
      status: "Complicated",
      progress: 10,
    },
  ];
  showItem: string[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeShowItem(val: string) {
    if (this.showItem.includes(val)) {
      this.showItem = this.showItem.filter((i) => i !== val);
    } else {
      this.showItem = this.showItem.concat([val]);
    }
  }
}
