/*
 * @Author: liu7i
 * @Date: 2022-04-20 18:11:21
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-20 18:11:55
 */

import { LoadingStore, PropsStore } from '@quarkunlimit/qu-mobx';
import { IPropsStore } from '../../interface';
import { MainStore } from './MainStore';
import { ToolStore } from './ToolStore';

import { ColumnStore } from './ColumnStore';

export type TLoadingStore = LoadingStore<'loading'>;

/** 根Store接口 */
export interface IRootStore {
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IPropsStore>;
  mainStore: MainStore;
  toolStore: ToolStore;
  columnStore: ColumnStore;
}
