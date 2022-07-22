/*
 * @Author: liu7i
 * @Date: 2022-04-25 13:41:32
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 14:32:49
 */

import React from "react";
import { Input } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";

const ModalTitle = observer(() => {
  const root = useStore();
  return (
    <div className="ng-setting-title">
      列表项配置
      <Input
        className="search"
        addonBefore={<i className="iconfont icon-sousuo" />}
        placeholder="请输入搜索"
      />
    </div>
  );
});

export default ModalTitle;
