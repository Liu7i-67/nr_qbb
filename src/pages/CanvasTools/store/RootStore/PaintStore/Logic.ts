/*
 * @Author: liu7i
 * @Date: 2022-07-14 18:02:13
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 11:14:41
 */

import { makeAutoObservable, toJS } from "@quarkunlimit/qu-mobx";
import { ILogic } from "./interface";
import { EPaintMode, IPoint, TLoadingStore } from "../interface";
import { RootStore } from "../";
import { MouseEvent } from "react";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  paintMode = EPaintMode.INIT;
  paintStatus: boolean = false;
  pointList: IPoint[] = [];
  ctx: Partial<CanvasRenderingContext2D> = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onMouseDown(e: MouseEvent<HTMLCanvasElement>) {
    const { el, toolStore } = this.rootStore;
    this.ctx = el.current?.getContext("2d") || {};
    this.paintStatus = true;
    switch (this.paintMode) {
      case EPaintMode.INIT:
        {
          const target = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          };
          toolStore.logic.saveSnapshot();
          this.ctx.beginPath?.();
          this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
          this.ctx.moveTo?.(target.x, target.y);
          this.ctx.stroke?.();
          this.pointList = [target];
        }
        break;
      case EPaintMode.ERASER:
        {
          const target = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          };
          toolStore.logic.saveSnapshot();
          this.ctx.clearRect?.(target.x - 3, target.y - 3, 6, 6);
          this.pointList = [target];
        }
        break;
    }
  }

  onMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    const { el } = this.rootStore;
    this.ctx = el.current?.getContext("2d") || {};
    if (!this.paintStatus) {
      return;
    }
    switch (this.paintMode) {
      case EPaintMode.INIT:
        {
          const target = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          };
          this.ctx.lineTo?.(target.x, target.y);
          this.ctx.stroke?.();
          this.pointList = [target];
        }
        break;
      case EPaintMode.ERASER:
        {
          const target = {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          };
          const width = this.ctx.lineWidth || 6;
          this.ctx.clearRect?.(
            target.x - width,
            target.y - width,
            2 * width,
            2 * width
          );
          this.pointList = [target];
        }
        break;
    }
  }

  onMouseUp(e: MouseEvent<HTMLCanvasElement>) {
    const { el } = this.rootStore;
    this.ctx = el.current?.getContext("2d") || {};
    if (!this.paintStatus) {
      return;
    }

    this.paintStatus = false;
    switch (this.paintMode) {
      case EPaintMode.INIT:
        {
          this.ctx.closePath?.();
          this.pointList = [];
        }
        break;
    }
  }

  onMouseLeave() {}
}
