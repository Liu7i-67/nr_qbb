/*
 * @Author: liu7i
 * @Date: 2022-04-24 15:06:00
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 16:56:09
 */

import { RootStore } from "../";
import { ILogic } from "./interface";
import { TLoadingStore } from "../interface";
import {
  ColumnPinningState,
  OnChangeFn,
  VisibilityState,
} from "@tanstack/react-table";
import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IColumns } from "@/components/NGTable/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  columnPinning: ColumnPinningState = {};
  showMode: "auto" | "fit-content" = "auto";
  columnVisibility: VisibilityState | undefined;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  initColumns(column: IColumns[]) {
    const arrLeft: string[] = [];
    const arrRight: string[] = [];
    const columnVisibility: VisibilityState = {};
    column?.forEach?.((c) => {
      switch (c.fixed) {
        case "left":
          {
            arrLeft.push(c.key);
          }
          break;
        case "right": {
          arrRight.push(c.key);
        }
      }

      columnVisibility[c.key] = c.display !== "none";
    });

    this.columnPinning = {
      left: arrLeft,
      right: arrRight,
    };
    this.columnVisibility = columnVisibility;
  }

  changeShowMode(tableWidth: number, columnWidth: number) {
    if (tableWidth <= columnWidth) {
      this.showMode = "fit-content";
    } else {
      this.showMode = "auto";
    }
  }

  changeColumnVisibility<T>(Updater: T, values: VisibilityState) {
    if (Updater) {
      this.columnVisibility = values;
    }
  }
}
