
import { LoadingStore } from '@quarkunlimit/qu-mobx';
import { RootStore } from '../';
import { Logic } from "./Logic"
import { Computed } from "./Computed"
import { TLoadingStore } from "../interface"



/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
}  
  
/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
}

/** 根Store接口 */
export interface IToolStore {
  logic: Logic;
  computed: Computed;
}
  