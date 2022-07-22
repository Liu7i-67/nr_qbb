import {
  createContainer,
  useLocalObservable,
  LoadingStore,
  makeAutoObservable,
} from "@quarkunlimit/qu-mobx";
import { useRef } from "react";
import { TLoadingStore, IRootStore } from "./interface";
import { CommonStore } from "./CommonStore";
import { ToolStore } from "./ToolStore";
import { OtherStore } from "./OtherStore";
import { PaintStore } from "./PaintStore";

export class RootStore implements IRootStore {
  el: React.RefObject<HTMLCanvasElement>;
  loadingStore: TLoadingStore;
  commonStore: CommonStore;
  toolStore: ToolStore;
  otherStore: OtherStore;
  paintStore: PaintStore;

  constructor(_el: React.RefObject<HTMLCanvasElement>) {
    this.el = _el;
    this.loadingStore = new LoadingStore();
    this.commonStore = new CommonStore(this);
    this.toolStore = new ToolStore(this);
    this.otherStore = new OtherStore(this);
    this.paintStore = new PaintStore(this);
    makeAutoObservable(this, { el: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const el = useRef<HTMLCanvasElement>(null);

  return useLocalObservable(() => new RootStore(el));
});

export * from "./interface";
