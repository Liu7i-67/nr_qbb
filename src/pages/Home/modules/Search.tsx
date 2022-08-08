/*
 * @Author: liu7i
 * @Date: 2022-08-08 11:19:55
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-08 13:41:51
 */

import React from "react";
import moment from "moment";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Input, Button, DatePicker } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

const Search = observer(function Search_() {
  const root = useStore();

  return (
    <div className="flex_a pl-12">
      搜索：
      <Input
        placeholder="请输入待办事项"
        style={{ width: "140px" }}
        className="ml-8 mr-8"
        value={root.logic.searchValue.content}
        onChange={(e) => {
          root.logic.changeSearchValue("content", e.target.value ?? "");
        }}
        allowClear
        onPressEnter={root.logic.search}
      />
      <DatePicker
        placeholder="请选择创建时间"
        allowClear
        value={
          root.logic.searchValue.createDate
            ? moment(root.logic.searchValue.createDate)
            : undefined
        }
        onChange={(e) => {
          root.logic.changeSearchValue(
            "createDate",
            e ? moment(e).format("YYYY-MM-DD") : ""
          );
        }}
      />
      <Button type="primary" className="ml-8" onClick={root.logic.search}>
        搜索
      </Button>
      <Button type="default" className="ml-8" onClick={root.logic.resetSearch}>
        重置
      </Button>
    </div>
  );
});

export default Search;
