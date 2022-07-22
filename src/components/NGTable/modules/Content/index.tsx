/*
 * @Author: liu7i
 * @Date: 2022-04-24 16:07:46
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 17:06:55
 */

import React from "react";
import { useStore } from "../../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";
import { classNames } from "utils/Tools";
import LeftRow from "./LeftRow";
import RightRow from "./RightRow";

const Content = observer(() => {
  const root = useStore();
  const { propsStore, mainStore } = root;

  const instance = propsStore.props.instance;
  if (!instance) {
    return null;
  }

  const _className = classNames("ng-tr-box", {
    auto: mainStore.logic.showMode === "auto",
  });

  return (
    <div
      {...instance.getTableBodyProps({
        className: "ng-tbody",
      })}
    >
      {instance.getRowModel().rows.map((row) => {
        return (
          <div className={_className} key={row.getRowProps().key}>
            <LeftRow row={row} />
            <div
              {...row.getRowProps({
                className: "ng-tr center",
              })}
            >
              {(mainStore.computed.isSplit
                ? row.getCenterVisibleCells()
                : row.getVisibleCells()
              ).map((cell) => {
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
            <RightRow row={row} />
          </div>
        );
      })}
    </div>
  );
});

export default Content;
