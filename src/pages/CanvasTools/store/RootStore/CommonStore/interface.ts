
import { LoadingStore } from '@quarkunlimit/qu-mobx';
import { RootStore } from '../';
import { Logic } from "./Logic"
import { Computed } from "./Computed"
import { TLoadingStore, IPoint, TDirection, IWeightAndHeight, IHelpLine } from "../interface"


/** 逻辑接口 */
export interface ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  /** @param 画布宽度 */
  width: number;
  /** @param 画布高度 */
  height: number;
  /** @param 画布新宽度(暂) */
  newWidth: number;
  /** @param 画布新高度(暂) */
  newHeight: number;
  /** @param 拖动起始点位置 */
  startPoint: Partial<IPoint>;
  /** @function 手动输入改变画布大小 */
  changeNewSize: (value: number, type: 'w' | 'h') => void;
  /** @function 验证手动输入的画布大小是否可用 */
  checkNewSize: (value: string, type: 'w' | 'h') => void;
  /** @function 开始拖动 */
  onDraggleStart: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dir: TDirection) => void;
  /** @function 清楚拖动信息 */
  clearStartPoint: () => void;
  /** @function 拖动结束 */
  onDraggleEnd: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, dir: TDirection) => void;
  /** @function 验证拖动修改的画布大小是否可用 */
  checkNewDraggleSize: (val: IWeightAndHeight) => void;
}

/** 计算属性接口 */
export interface IComputed {
  rootStore: RootStore;
  /** @getter 输入框展示的宽度 */
  width: number;
  /** @getter 输入框展示的高度 */
  height: number;
  /** @param 宽度拖拽辅助线是否显示 */
  widthLine: IHelpLine;
  /** @param 高度拖拽辅助线是否显示 */
  heightLine: IHelpLine;
}

/** 根Store接口 */
export interface ICommonStore {
  logic: Logic;
  computed: Computed;
}

