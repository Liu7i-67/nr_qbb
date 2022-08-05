/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:26:31
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 17:30:13
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
  /** @param 修改时间 时间戳 */
  updateDate: number;
  /** @param 状态 0-待办 1-已完成 2已作废 */
  status: number;
}
