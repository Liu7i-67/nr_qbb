/*
 * @Author: liu7i
 * @Date: 2022-04-20 18:09:51
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 11:06:05
 */

import {
  createContainer,
  useLocalObservable,
  LoadingStore,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { TLoadingStore, IRootStore } from "./interface";
import { IPropsStore } from "../../interface";
import { MainStore } from "./MainStore";
import { ToolStore } from "./ToolStore";
import { ColumnStore } from "./ColumnStore";

export class RootStore implements IRootStore {
  loadingStore: TLoadingStore;
  mainStore: MainStore;
  toolStore: ToolStore;
  propsStore: PropsStore<IPropsStore>;
  columnStore: ColumnStore;

  constructor() {
    this.loadingStore = new LoadingStore();
    this.propsStore = new PropsStore();
    this.mainStore = new MainStore(this);
    this.toolStore = new ToolStore(this);
    this.columnStore = new ColumnStore(this);
  }
}

export const { Provider, useStore } = createContainer(() =>
  useLocalObservable(() => new RootStore())
);
