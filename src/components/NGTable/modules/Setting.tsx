/*
 * @Author: liu7i
 * @Date: 2022-04-25 10:07:54
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 11:06:57
 */

import React from "react";
import { Popover, Divider } from "antd";
import { useStore } from "../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";

const Setting = observer(() => {
  const root = useStore();
  const { propsStore, columnStore } = root;

  const instance = propsStore.props.instance;
  if (!instance) {
    return null;
  }

  return (
    <div className="ng-setting">
      <Popover content="列表项设置">
        <i
          className="iconfont icon-shezhi_huaban"
          onClick={columnStore.logic.openModal}
        />
      </Popover>
    </div>
  );
});

export default Setting;
