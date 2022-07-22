/*
 * @Author: liu7i
 * @Date: 2022-07-14 15:23:03
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 11:27:29
 */

import React from "react";
import { InputNumber, Space, Button, Radio } from "antd";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore, EPaintMode } from "../store/RootStore";

const ToolBar = observer(() => {
  const root = useStore();
  const { commonStore, toolStore, paintStore } = root;

  return (
    <div className="canvasTools-Tool">
      <Space>
        <span>当前画布大小</span>
        <InputNumber
          addonBefore="宽度"
          addonAfter="px"
          value={commonStore.computed.width}
          style={{ width: 180 }}
          onChange={(v) => {
            commonStore.logic.changeNewSize(v, "w");
          }}
          onBlur={(e) => {
            commonStore.logic.checkNewSize(e.target.value, "w");
          }}
          max={99999}
          min={0}
          precision={0}
        />
        <InputNumber
          addonBefore="高度"
          addonAfter="px"
          value={commonStore.computed.height}
          max={99999}
          min={0}
          style={{ width: 180 }}
          onChange={(v) => {
            commonStore.logic.changeNewSize(v, "h");
          }}
          onBlur={(e) => {
            commonStore.logic.checkNewSize(e.target.value, "h");
          }}
          precision={0}
        />
        <Button type="ghost" onClick={toolStore.logic.clearAll}>
          清空画布
        </Button>
        <Button type="ghost" onClick={toolStore.logic.exportCtx}>
          导出画布
        </Button>
        <Button
          type="ghost"
          onClick={() => {
            toolStore.logic.revoke();
          }}
          disabled={!toolStore.logic.snapshots.length}
        >
          回退
        </Button>
        <Radio.Group
          value={paintStore.logic.paintMode}
          onChange={(e) => {
            toolStore.logic.changePaintMode(e.target.value as EPaintMode);
          }}
        >
          <Radio.Button value={EPaintMode.INIT}>普通画笔</Radio.Button>
          <Radio.Button value={EPaintMode.ERASER}>橡皮擦</Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
});

export default ToolBar;
