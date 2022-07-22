/*
 * @Author: liu7i
 * @Date: 2022-07-07 15:16:53
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-07 17:16:14
 */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { TooltipPropsWithTitle } from "antd/lib/tooltip/index";
import { message, Popover } from "antd";
import "./index.scss";

export interface INGEllipsis extends TooltipPropsWithTitle {
  /** @param 最多可展示多少行  默认为1 最大为5 */
  row?: 1 | 2 | 3 | 4 | 5;
  /** @param 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 默认0.5秒 */
  mouseLeaveDelay?: number;
}

const NGEllipsis = (props: INGEllipsis) => {
  const { title, row = 1, mouseLeaveDelay = 0.5, ...rest } = props;

  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const timer = useRef<any>();

  const onMouseEnter = useCallback(() => {
    clearTimeout(timer.current);
    setVisible(
      contentRef.current?.offsetHeight !== shadowRef.current?.offsetHeight
    );
  }, []);

  const onMouseLeave = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(false);
    }, mouseLeaveDelay * 100);
  }, [mouseLeaveDelay]);

  const Copy = useCallback(() => {
    const value = contentRef.current?.innerHTML;
    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(
      () => {
        message.success("复制成功");
      },
      () => {
        message.error("复制失败");
      }
    );
  }, []);

  const onMouseEnterContent = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      className={`ng_ellipsis wes_${row}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Popover
        content={
          <div
            onMouseEnter={onMouseEnterContent}
            onMouseLeave={onMouseLeave}
            onDoubleClick={Copy}
          >
            {props.title}
          </div>
        }
        {...rest}
        visible={visible}
      >
        <div className={`wes_${row}`} ref={contentRef}>
          {props.title}
        </div>
      </Popover>
      <div className="ng_ellipsis_shadow" ref={shadowRef}>
        {props.title}
      </div>
    </div>
  );
};

NGEllipsis.defaultProps = {} as Partial<INGEllipsis>;

export default NGEllipsis;
