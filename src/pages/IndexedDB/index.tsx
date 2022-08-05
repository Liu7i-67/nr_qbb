/*
 * @Author: liu7i
 * @Date: 2022-04-27 10:20:27
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-22 13:37:15
 */

import { IAny } from "utils/interface";
import { Input, Button, message, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IndexDBHelper } from "utils/IndexDBHelper";
import { to } from "utils/Tools";
import "./index.scss";

const db = new IndexDBHelper();

const Page = () => {
  const [dataSource, setDataSource] = useState<IAny>([]);
  const [editItem, setEditItem] = useState<IAny>();
  const [value, setValue] = useState<string>();

  const getDataList = useCallback(async () => {
    const [, res] = await to(db.readTable("map"));
    setDataSource(res?.data || []);
  }, []);

  const getSearchList = useCallback(async () => {
    const [, res] = await to(
      db.searchList("map", {
        startIndex: { index: 1, includeOwn: true },
      })
    );
    setDataSource(res?.data || []);
  }, []);

  const addRecord = async () => {
    const [, res] = await to(db.addRecord("map", { name: value }));
    if (res?.code === 1) {
      message.success("添加成功");
      setValue(undefined);
      getDataList();
      return;
    }
    message.error("添加失败");
  };

  const updateRecord = async () => {
    const [, res] = await to(
      db.updateRecord("map", editItem?.id, { name: value })
    );
    if (res?.code === 1) {
      message.success("修改成功");
      setEditItem(undefined);
      setValue(undefined);
      getDataList();
      return;
    }
    message.error("修改失败");
  };

  const deleteItem = useCallback((index: number) => {
    Modal.confirm({
      title: "确认删除？",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const [, res] = await to(db.deleteRecord("map", index));
        if (res?.code === 1) {
          message.success("删除成功");
          getDataList();
          return;
        }
        message.error("删除失败");
      },
    });
  }, []);

  useEffect(() => {
    // getDataList();
    getSearchList();
  }, []);

  return (
    <div className="page-home">
      <div>Home</div>
      <div className="mt-24 mb-12">
        新增地图：
        <Input
          style={{ width: 120 }}
          maxLength={10}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {!editItem && (
          <Button type="default" onClick={addRecord} disabled={!value}>
            添加
          </Button>
        )}
        {editItem && (
          <Button type="default" onClick={updateRecord} disabled={!value}>
            修改
          </Button>
        )}
        {editItem && (
          <Button
            type="default"
            onClick={() => {
              setEditItem(undefined);
            }}
            disabled={!value}
          >
            重置
          </Button>
        )}
      </div>
      <div>地图列表:</div>
      {dataSource.length === 0 && <div>空</div>}
      <div>
        {dataSource.map((item: IAny) => (
          <div key={item.id}>
            <span
              style={{
                color: item.id === editItem?.id ? "blue" : "#333",
              }}
            >
              {item.name}
            </span>
            <span
              className="ml-32 csr"
              onClick={() => {
                deleteItem(item.id);
              }}
            >
              删
            </span>
            <span
              className="ml-12 csr"
              onClick={() => {
                setValue(item.name);
                setEditItem(item);
              }}
            >
              改
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
