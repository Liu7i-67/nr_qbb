/*
 * @Author: liu7i
 * @Date: 2022-04-24 15:36:41
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 10:14:21
 */

import React from "react";
import { useStore } from "../../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";

const LeftHeader = observer(() => {
  const root = useStore();
  const { propsStore, mainStore } = root;

  const instance = propsStore.props.instance;

  if (!mainStore.computed.isLeftSplit) {
    return null;
  }

  return (
    <div className="ng-thead left">
      {instance!.getLeftHeaderGroups().map((headerGroup) => (
        <div
          {...headerGroup.getHeaderGroupProps({
            className: "ng-tr",
          })}
        >
          {headerGroup.headers.map((header) => (
            <div
              {...header.getHeaderProps((props: any) => ({
                ...props,
                className: "ng-th",
                style: {
                  ...props.style,
                  width: header.getWidth(),
                },
              }))}
            >
              {header.isPlaceholder ? null : header.renderHeader()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default LeftHeader;
