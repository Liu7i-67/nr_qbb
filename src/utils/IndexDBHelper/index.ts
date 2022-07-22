/*
 * @Author: liu7i
 * @Date: 2022-07-21 10:05:10
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-22 13:47:39
 */

import type { IDBItem, TRes, ISearchConfig } from "./interface";
import type { IAny } from "utils/interface";
import { dbConfig } from "./dbConfig";
import { EConnect, EStatus } from "./enum";
import { canPush } from "./utils";

export class IndexDBHelper {
  /** @param 数据库连接信息 */
  dbItem: IDBItem = {
    name: "qbb",
    status: EConnect.OFFLINE,
    table: [],
    version: 0,
  };

  constructor() {
    this.#updateObj(this.dbItem, dbConfig);
    this.#init();
  }

  /** @function 初始化数据库 */
  #init = () => {
    const request = indexedDB.open(this.dbItem.name);
    request.onsuccess = (e: IAny) => {
      const newVersion = e?.target?.result?.version || this.dbItem.version;
      this.#updateObj(this.dbItem, {
        status: EConnect.ONLINE,
        db: request,
        version: newVersion,
      });
    };
    request.onerror = (e: IAny) => {
      this.#updateObj(this.dbItem, {
        status: EConnect.CONNECTION_FAILED,
      });
    };

    request.onupgradeneeded = (e: IAny) => {
      const db = e?.target?.result;
      dbConfig.table.forEach((i) => {
        const store = db.createObjectStore(i.name, i.otherSetting);
        i.index.forEach((j) => {
          store.createIndex(j.name, j.key, j.otherSetting);
        });
        // 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
        store.transaction.oncomplete = function (event: IAny) {
          // 将数据保存到新创建的对象仓库
          const customerObjectStore = db
            .transaction(i.name, "readwrite")
            .objectStore(i.name);
          i.initData.forEach(function (record) {
            customerObjectStore.add(record);
          });
        };
      });
    };
  };

  /** @function 更新数据库相关信息 */
  #updateObj = <T>(old: T, newStatus: Partial<T>) => {
    old = Object.assign({}, old, newStatus);
  };

  /**
   * @function 读取指定对象表的数据
   * @param name 对象表名称
   * @param index 指定索引位置
   */
  readTable = (name: string, index?: number): TRes => {
    return new Promise((resolve, reject) => {
      const item = dbConfig.table.find((i) => i.name === name);
      if (!item) {
        reject({ code: EStatus.ERROR_NOT_FOUND });
        return;
      }
      const request = indexedDB.open(this.dbItem.name);
      request.onsuccess = (e: IAny) => {
        const db = e?.target?.result;
        const store = db.transaction(name).objectStore(name);
        if (index !== undefined) {
          const req = store.get(index);
          req.onsuccess = (e: IAny) => {
            resolve({ code: EStatus.SUCCESS, data: e.target.result });
          };
          req.onerror = () => {
            reject({ code: EStatus.ERROR_GET });
          };
          return;
        }

        const req = store.getAll();
        req.onsuccess = (e: IAny) => {
          resolve({ code: EStatus.SUCCESS, data: e?.target?.result });
        };
        req.onerror = () => {
          reject({ code: EStatus.ERROR_CURSOR });
          return;
        };
      };

      request.onerror = () => {
        reject({ code: EStatus.ERROR_OPEN });
      };
    });
  };

  /**
   * @function 插入数据
   * @param name 对象表名称
   * @param record 插入内容
   */
  addRecord = (name: string, record: IAny): TRes => {
    return new Promise((resolve, reject) => {
      const item = dbConfig.table.find((i) => i.name === name);
      if (!item) {
        reject({ code: EStatus.ERROR_NOT_FOUND });
        return;
      }
      const request = indexedDB.open(this.dbItem.name);
      request.onsuccess = (e: IAny) => {
        const db = e?.target?.result;
        const store = db.transaction(item.name);
        store.oncomplete = (e: IAny) => {
          const write = db
            .transaction(item.name, "readwrite")
            .objectStore(item.name);
          write.add(record);
          resolve({ code: EStatus.SUCCESS });
        };
        store.onerror = () => {
          reject({ code: EStatus.ERROR_TRANSACTION });
        };
      };
      request.onerror = () => {
        reject({ code: EStatus.ERROR_OPEN });
      };
    });
  };

  /**
   * @function 删除数据
   * @param name 对象表名称
   * @param index 指定索引位置
   */
  deleteRecord = (name: string, index: number): TRes => {
    return new Promise((resolve, reject) => {
      const item = dbConfig.table.find((i) => i.name === name);
      if (!item) {
        reject({ code: EStatus.ERROR_NOT_FOUND });
        return;
      }
      const request = indexedDB.open(this.dbItem.name);
      request.onsuccess = (e: IAny) => {
        const db = e?.target?.result;
        const req = db
          .transaction(name, "readwrite")
          .objectStore(name)
          .delete(index);
        req.onsuccess = () => {
          resolve({ code: EStatus.SUCCESS });
        };
        req.onerror = () => {
          reject({ code: EStatus.ERROR_DELETE });
        };
      };

      request.onerror = () => {
        reject({ code: EStatus.ERROR_OPEN });
      };
    });
  };

  /**
   * @function 修改数据
   * @param name 对象表名称
   * @param index 修改的索引位置
   * @param record 修改后的内容
   */
  updateRecord = (name: string, index: number, record: IAny): TRes => {
    return new Promise((resolve, reject) => {
      const item = dbConfig.table.find((i) => i.name === name);
      if (!item) {
        reject({ code: EStatus.ERROR_NOT_FOUND });
        return;
      }
      const request = indexedDB.open(this.dbItem.name);
      request.onsuccess = (e: IAny) => {
        const db = e?.target?.result;
        const store = db.transaction(name, "readwrite").objectStore(name);
        const req = store.get(index);
        req.onsuccess = (e: IAny) => {
          const data = e.target.result;
          const newData = Object.assign({}, data, record);
          const reqUpdate = store.put(newData);
          reqUpdate.onsuccess = () => {
            resolve({ code: EStatus.SUCCESS });
          };
          reqUpdate.onerror = () => {
            reject({ code: EStatus.SUCCESS });
          };
        };
        req.onerror = () => {
          reject({ code: EStatus.ERROR_UPDATE });
        };
      };

      request.onerror = () => {
        reject({ code: EStatus.ERROR_OPEN });
      };
    });
  };

  /**
   * @function 指定条件查询
   * @param name 对象表的名称
   * @param config 查询条件
   */
  searchList = (name: string, config: ISearchConfig): TRes => {
    return new Promise((resolve, reject) => {
      const item = dbConfig.table.find((i) => i.name === name);
      if (!item) {
        reject({ code: EStatus.ERROR_NOT_FOUND });
        return;
      }

      const request = indexedDB.open(this.dbItem.name);
      request.onsuccess = (e: IAny) => {
        const db = e?.target?.result;
        const store = db.transaction(name, "readwrite").objectStore(name);

        let searchRange: IDBKeyRange | undefined = undefined;

        if (config?.startIndex) {
          // 范围查询
          if (config?.endIndex) {
            searchRange = IDBKeyRange.bound(
              config.startIndex.index,
              config.endIndex.index,
              !config.startIndex.includeOwn,
              !config.endIndex.includeOwn
            );
          } else {
            // 只有起始区间
            searchRange = IDBKeyRange.lowerBound(
              config.startIndex.index,
              !config.startIndex.includeOwn
            );
          }
        }

        const req = store.openCursor(
          searchRange,
          config?.needPrev ? "prev" : undefined
        );

        const dataSource: IAny[] = [];
        let index = 0;
        req.onsuccess = (e: IAny) => {
          const cursor = e.target.result;

          // 指定需要多少条
          if (
            cursor &&
            config?.pageSize &&
            dataSource.length < config.pageSize
          ) {
            const _canPush = canPush(cursor?.value, item, config.keys);
            // 需要分页
            if (config?.current) {
              const minIndex = (config.current - 1) * config.pageSize;
              const maxIndex = config.current * config.pageSize - 1;
              if (index >= minIndex && index <= maxIndex && _canPush) {
                dataSource.push(cursor.value);
              }
              index++;
              cursor.continue();
            } else {
              // 不需要分页
              if (_canPush) {
                dataSource.push(cursor.value);
              }
              cursor.continue();
            }
          } else if (cursor && !config?.pageSize) {
            const _canPush = canPush(cursor?.value, item, config.keys);
            // 未指定具体条目
            if (_canPush) {
              dataSource.push(cursor.value);
            }

            cursor.continue();
          } else {
            resolve({ code: EStatus.SUCCESS, data: dataSource });
          }
        };
        req.onerror = () => {
          reject({ code: EStatus.ERROR_CURSOR });
        };
      };

      request.onerror = () => {
        reject({ code: EStatus.ERROR_OPEN });
      };
    });
  };
}

export * from "./interface";
export * from "./enum";
