/*
 * @Author: liu7i
 * @Date: 2022-04-24 15:36:41
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-24 16:36:34
 */

import React from "react";
import { Row } from "@tanstack/react-table";
import { useStore } from "../../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";

export interface IProps {
  row: Row<any>;
}

const LeftRow = observer((props: IProps) => {
  const root = useStore();
  const { mainStore } = root;

  if (!props.row || !mainStore.computed.isLeftSplit) {
    return null;
  }

  return (
    <div
      {...props.row.getRowProps({
        className: "ng-tr left",
      })}
    >
      {props.row.getLeftVisibleCells().map((cell) => {
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

export default LeftRow;
