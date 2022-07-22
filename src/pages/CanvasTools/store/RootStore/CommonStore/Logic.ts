/*
 * @Author: liu7i
 * @Date: 2022-07-14 15:19:13
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 11:21:59
 */

import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { ILogic } from "./interface";
import {
  TLoadingStore,
  IPoint,
  TDirection,
  IWeightAndHeight,
  minLength,
} from "../interface";
import { RootStore } from "../";
import { message } from "antd";
import { MouseEvent } from "react";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  width: number = minLength * 2;
  height: number = minLength * 1.5;
  newWidth: number = -1;
  newHeight: number = -1;
  startPoint: Partial<IPoint> = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeNewSize(value: number, type: "w" | "h") {
    switch (type) {
      case "w":
        {
          this.newWidth = value ?? -1;
        }
        break;
      case "h":
        {
          this.newHeight = value ?? -1;
        }
        break;
    }
  }

  checkNewSize(value: string, type: "w" | "h") {
    const { toolStore } = this.rootStore;
    const realValue = +value;
    const canUse = typeof realValue === "number" && realValue >= minLength;

    if (!canUse) {
      message.warn(`画布的宽高不能小于${minLength}px`);
    }

    switch (type) {
      case "w":
        {
          toolStore.logic.saveSnapshot();
          this.newWidth = -1;
          this.width = canUse ? realValue : this.width;
        }
        break;
      case "h":
        {
          toolStore.logic.saveSnapshot();
          this.newHeight = -1;
          this.height = canUse ? realValue : this.height;
        }
        break;
    }
  }

  onDraggleStart(e: MouseEvent<HTMLDivElement>, dir: TDirection) {
    this.startPoint = {
      x: e.clientX,
      y: e.clientY,
      dir,
    };
  }

  onDraggleEnd(e: MouseEvent<HTMLDivElement>, dir: TDirection) {
    const endPoint: IPoint = {
      x: e.clientX,
      y: e.clientY,
    };

    const MoveX = endPoint.x - (this.startPoint.x || 0);
    const MoveY = endPoint.y - (this.startPoint.y || 0);

    const val: IWeightAndHeight = {};

    switch (dir) {
      case "e":
        {
          val.width = this.width + MoveX;
        }
        break;
      case "w":
        {
          val.width = this.width - MoveX;
        }
        break;
      case "n":
        {
          val.height = this.height - MoveY;
        }
        break;
      case "s":
        {
          val.height = this.height + MoveY;
        }
        break;
      case "se":
        {
          val.height = this.height + MoveY;
          val.width = this.width + MoveX;
        }
        break;
      case "sw":
        {
          val.height = this.height + MoveY;
          val.width = this.width - MoveX;
        }
        break;
      case "ne":
        {
          val.height = this.height - MoveY;
          val.width = this.width + MoveX;
        }
        break;
      case "nw": {
        val.height = this.height - MoveY;
        val.width = this.width - MoveX;
      }
    }

    this.checkNewDraggleSize(val);
  }

  checkNewDraggleSize(val: IWeightAndHeight) {
    const { toolStore } = this.rootStore;
    const canUseW = (val.width || 0) >= minLength;
    const canUseH = (val.height || 0) >= minLength;

    let canUpdate = true;

    if (val.width && val.height) {
      canUpdate = canUseW && canUseH;
    } else if (val.width) {
      canUpdate = canUseW;
    } else {
      canUpdate = canUseH;
    }

    this.clearStartPoint();
    if (!canUpdate) {
      message.warn(`画布的宽高不能小于${minLength}px`);
      return;
    }
    toolStore.logic.saveSnapshot();
    if (canUseW) {
      this.width = val.width || this.width;
    }

    if (canUseH) {
      this.height = val.height || this.height;
    }
  }

  clearStartPoint() {
    this.startPoint = {};
  }
}
