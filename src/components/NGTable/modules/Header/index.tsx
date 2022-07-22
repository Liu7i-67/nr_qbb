/*
 * @Author: liu7i
 * @Date: 2022-04-24 16:07:46
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-25 17:06:22
 */

import React from "react";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import { classNames } from "utils/Tools";
import { useStore } from "../../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";

const Header = observer(() => {
  const root = useStore();
  const { propsStore, mainStore } = root;

  const instance = propsStore.props.instance;
  if (!instance) {
    return null;
  }

  const _className = classNames("ng-thead-box", {
    auto: mainStore.logic.showMode === "auto",
  });

  return (
    <div className={_className}>
      <LeftHeader />
      <div className="ng-thead center">
        {(mainStore.computed.isSplit
          ? instance.getCenterHeaderGroups()
          : instance.getHeaderGroups()
        ).map((headerGroup) => (
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
      <RightHeader />
    </div>
  );
});

export default Header;
