/*
 * @Author: liu7i
 * @Date: 2022-07-15 10:09:44
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 11:29:24
 */

import { makeAutoObservable, runInAction } from "@quarkunlimit/qu-mobx";
import { ILogic } from "./interface";
import { Modal, message } from "antd";
import { EPaintMode, IArea, TLoadingStore, ISnapshot } from "../interface";
import { RootStore } from "../";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  snapshots: ISnapshot[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  clearCtx(position?: Partial<IArea>) {
    const { el, paintStore, commonStore } = this.rootStore;
    paintStore.logic.ctx = el.current?.getContext("2d") || {};
    paintStore.logic.ctx.clearRect?.(
      position?.x ?? 0,
      position?.y ?? 0,
      position?.width ?? commonStore.logic.width,
      position?.height ?? commonStore.logic.height
    );
  }

  clearAll() {
    Modal.confirm({
      title: "即将清空整个画布，是否继续？",
      okText: "继续",
      cancelText: "取消",
      onOk: () => {
        runInAction(() => {
          this.clearCtx();
        });
      },
    });
  }

  changePaintMode(newMode: EPaintMode) {
    const { paintStore } = this.rootStore;
    paintStore.logic.paintMode = newMode;
    paintStore.logic.paintStatus = false;
  }

  saveSnapshot(position?: Partial<IArea>) {
    const { el, paintStore, commonStore } = this.rootStore;
    paintStore.logic.ctx = el.current?.getContext("2d") || {};
    const x = position?.x ?? 0;
    const y = position?.y ?? 0;
    const snapshot = paintStore.logic.ctx.getImageData?.(
      x,
      y,
      position?.width ?? commonStore.logic.width,
      position?.height ?? commonStore.logic.height
    ) as ImageData;
    // 如果已经存储了20条快照信息
    if (this.snapshots.length >= 20) {
      this.snapshots.splice(0, 1);
      this.snapshots.push({
        img: snapshot,
        x,
        y,
      });
      return;
    }
    this.snapshots.push({
      img: snapshot,
      x,
      y,
    });
  }

  revoke(index?: number) {
    if (this.snapshots.length === 0) {
      message.warn("当前无可回退快照");
      return;
    }
    if (typeof index == "number" && !this.snapshots[index]) {
      message.warn("找不到目标快照");
      return;
    }
    const { el, paintStore } = this.rootStore;
    paintStore.logic.ctx = el.current?.getContext("2d") || {};
    const item = this.snapshots.splice(-1, 1)[0];
    paintStore.logic.ctx.putImageData?.(item.img, item.x, item.y);
    paintStore.logic.paintStatus = false;
  }

  exportCtx() {
    const { el, paintStore } = this.rootStore;
    paintStore.logic.ctx = el.current?.getContext("2d") || {};
    const imgUrl = el.current?.toDataURL("image/png", 1) as string;
    const link = document.createElement("a");
    const evt = document.createEvent("MouseEvents");
    link.style.display = "none";
    link.href = imgUrl;
    link.download = `${Date.now()}.png`;
    document.body.appendChild(link); // 此写法兼容可火狐浏览器
    evt.initEvent("click", false, false);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
  }
}
