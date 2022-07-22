/*
 * @Author: liu7i
 * @Date: 2022-04-24 15:36:41
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-24 16:42:54
 */

import React from "react";
import { Row } from "@tanstack/react-table";
import { useStore } from "../../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";

export interface IProps {
  row: Row<any>;
}
const RightRow = observer((props: IProps) => {
  const root = useStore();
  const { mainStore } = root;

  if (!props.row || !mainStore.computed.isRightSplit) {
    return null;
  }

  return (
    <div
      {...props.row.getRowProps({
        className: "ng-tr right",
      })}
    >
      {props.row.getRightVisibleCells().map((cell) => {
        return (
          <div
            {...cell.getCellProps((props: any) => {
              return {
                ...props,
                className: "ng-td",
                style: {
                  ...props.style,
                  width: cell.column.getWidth(),
                },
              };
            })}
          >
            {cell.renderCell()}
          </div>
        );
      })}
    </div>
  );
});

export default RightRow;
