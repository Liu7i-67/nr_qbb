/*
 * @Author: liu7i
 * @Date: 2022-07-21 10:06:09
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-22 10:26:00
 */

/** @enum 数据库链接状态 */
export enum EConnect {
  /** @param 在线 */
  ONLINE = 1,
  /** @param 离线 */
  OFFLINE = 0,
  /** @param 连接失败 */
  CONNECTION_FAILED = -1,
}

/** @enum 数据读取结果 */
export enum EStatus {
  /** @param 读取成功 */
  SUCCESS = 1,
  /** @param 读取失败 */
  ERROR = 0,
  /** @param 读取失败-打开数据库 */
  ERROR_OPEN = -1,
  /** @param 读取失败-get获取数据 */
  ERROR_GET = -2,
  /** @param 读取失败-游标获取数据 */
  ERROR_CURSOR = -3,
  /** @param 数据库中不存在该对象表 */
  ERROR_NOT_FOUND = -4,
  /** @param 写入失败-事务初始化 */
  ERROR_TRANSACTION = -5,
  /** @param 删除失败 */
  ERROR_DELETE = -6,
  /** @param 修改失败 */
  ERROR_UPDATE = -7,
  /** @param 对象表异常-无索引 */
  ERROR_NO_INDEX = -8,
}
