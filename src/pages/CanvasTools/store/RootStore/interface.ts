import { LoadingStore } from "@quarkunlimit/qu-mobx";
import { CommonStore } from "./CommonStore";
import { ToolStore } from "./ToolStore";
import { OtherStore } from "./OtherStore";

import { PaintStore } from "./PaintStore";

export const minLength = 500;

export type TLoadingStore = LoadingStore<"loading">;

/** 根Store接口 */
export interface IRootStore {
  /** @param canvas ref */
  el: React.RefObject<HTMLCanvasElement>;
  loadingStore: TLoadingStore;
  commonStore: CommonStore;
  toolStore: ToolStore;
  otherStore: OtherStore;
  paintStore: PaintStore;
}

export interface IPoint {
  x: number;
  y: number;
  dir?: TDirection;
}

/** @type 拖拽方向 */
export type TDirection = "n" | "s" | "w" | "e" | "ne" | "nw" | "se" | "sw";

export interface IWeightAndHeight {
  width?: number;
  height?: number;
}

export interface IHelpLine {
  /** @param 是否显示拖拽辅助线 */
  show?: boolean;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width?: number;
  height?: number;
}

export enum EPaintMode {
  /** @param 普通画笔 */
  INIT = "INIT",
  /** @param 橡皮 */
  ERASER = "ERASER",
}

export interface IArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ISnapshot {
  img: ImageData;
  x: number;
  y: number;
}
