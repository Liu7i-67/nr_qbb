import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "../";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLeftSplit() {
    const { mainStore } = this.rootStore;
    if (mainStore.logic.columnPinning.left?.length) {
      return true;
    }
    return false;
  }

  get isRightSplit() {
    const { mainStore } = this.rootStore;
    if (mainStore.logic.columnPinning.right?.length) {
      return true;
    }
    return false;
  }

  get isSplit() {
    return this.isLeftSplit || this.isRightSplit;
  }
}
