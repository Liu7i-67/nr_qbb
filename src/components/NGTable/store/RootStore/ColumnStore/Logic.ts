/*
 * @Author: liu7i
 * @Date: 2022-04-25 11:01:28
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 16:53:07
 */
import { RootStore } from "../";
import { ILogic } from "./interface";
import { TLoadingStore } from "../interface";
import { ignoreKeys } from "../../../interface";
import { makeAutoObservable, toJS } from "@quarkunlimit/qu-mobx";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  visible: boolean = false;
  columnVisibility: string[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal() {
    const { mainStore } = this.rootStore;
    const columnVisibility: string[] = [];
    if (mainStore.logic.columnVisibility) {
      Object.keys(mainStore.logic.columnVisibility).forEach((i) => {
        if (!ignoreKeys.includes(i) && mainStore.logic.columnVisibility?.[i]) {
          columnVisibility.push(i);
        }
      });
    }
    this.columnVisibility = columnVisibility;
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  changeColumnVisibility(values: string[]) {
    this.columnVisibility = values;
  }

  checkAll() {
    const { columnStore } = this.rootStore;
    const columnVisibility = columnStore.computed.columnKeys.map((i) => i.key);

    if (columnVisibility.length === this.columnVisibility.length) {
      this.columnVisibility = [];
    } else {
      this.columnVisibility = columnVisibility;
    }
  }

  saveChange() {
    const { mainStore,propsStore } = this.rootStore;
    const columnVisibility = toJS(mainStore.logic.columnVisibility) || {};
    Object.keys(columnVisibility).forEach((k) => {
      if (!ignoreKeys.includes(k)) {
        columnVisibility[k] = this.columnVisibility.includes(k);
      }
    });
    propsStore.props.instance?.setColumnVisibility?.(columnVisibility)
    this.closeModal();
  }
}
