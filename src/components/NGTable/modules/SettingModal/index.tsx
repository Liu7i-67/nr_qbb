/*
 * @Author: liu7i
 * @Date: 2022-04-25 13:42:36
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 16:28:28
 */
import "./index.scss";
import React from "react";
import { Modal, Checkbox } from "antd";
import ModalTitle from "./ModalTitle";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";

const SettingModal = observer(() => {
  const root = useStore();
  const { columnStore } = root;

  return (
    <Modal
      visible={columnStore.logic.visible}
      onCancel={columnStore.logic.closeModal}
      cancelText="取消"
      okText="保存"
      wrapClassName="ng-table-setting-modal"
      title={<ModalTitle />}
      width={800}
      onOk={columnStore.logic.saveChange}
    >
      <div className="left">
        <div className="top">
          <span className="mr-16">可选字段</span>
          <Checkbox
            indeterminate={!columnStore.computed.checkedAll}
            checked={columnStore.computed.checked}
            onClick={columnStore.logic.checkAll}
          >
            全选
          </Checkbox>
        </div>
        <div>
          <Checkbox.Group
            // @ts-ignore
            onChange={columnStore.logic.changeColumnVisibility}
            value={columnStore.logic.columnVisibility}
          >
            {columnStore.computed.columnKeys.map((k) => (
              <Checkbox key={k.key} value={k.key} className="ng-column-item">
                {k.title}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>
      <div className="right">2</div>
    </Modal>
  );
});

export default SettingModal;
