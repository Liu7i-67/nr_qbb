/*
 * @Author: liu7i
 * @Date: 2022-08-05 17:23:10
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 17:24:13
 */

import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Input, Button, InputNumber, Tooltip } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";

const Actions = observer(function Actions_() {
  return (
    <div className="flex_a">
      <Input
        placeholder="请输入待办事项"
        style={{ width: "300px" }}
        className="ml-8 mr-8"
      />
      <InputNumber
        placeholder="请输入优先级"
        precision={0}
        min={0}
        max={9999}
        style={{ width: "160px" }}
        addonBefore={
          <Tooltip title="数字越小优先级越高（0~9999）">
            <InfoCircleOutlined />
          </Tooltip>
        }
      />
      <Button type="primary" className="ml-8">
        添加
      </Button>
    </div>
  );
});

export default Actions;
