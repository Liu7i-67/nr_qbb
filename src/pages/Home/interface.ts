/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:26:31
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 11:38:12
 */

export interface IHomeProps {}

export interface ITodo {
  uuid: string;
  /** @param 待办事项内容 */
  content: string;
  /** @param 待办事项优先级越小越高 */
  index: number;
  /** @param 创建时间 YYYY-MM-DD */
  createDate: string;
  /** @param 状态 0-待办 1-已完成 2已作废 */
  status: number;
}

export interface ISearchValue {
  /** @param 搜索内容 */
  content: string;
  /** @param 创建时间 */
  createDate: string;
  /** @param 搜索是否生效 */
  useSearch: string;
}
