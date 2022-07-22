/*
 * @Author: liu7i
 * @Date: 2022-04-25 11:01:21
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 17:15:15
 */

import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IColumns, ignoreKeys } from "../../../interface";
import { IComputed } from "./interface";
import { RootStore } from "../";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get columnKeys() {
    const { propsStore } = this.rootStore;

    const _columnKeys =
      propsStore.props.columns?.filter?.(
        (i) => !i.fixed && i.display !== "none"
      ) || [];

    return _columnKeys as IColumns[];
  }

  get checked() {
    const { columnStore } = this.rootStore;
    return !!columnStore.logic.columnVisibility.length;
  }

  get checkedAll() {
    const { columnStore } = this.rootStore;

    if (columnStore.logic.columnVisibility.length === 0) {
      return true;
    }

    return columnStore.logic.columnVisibility.length === this.columnKeys.length;
  }
}
