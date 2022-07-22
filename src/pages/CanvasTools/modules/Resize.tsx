/*
 * @Author: liu7i
 * @Date: 2022-07-14 15:23:03
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 11:19:19
 */

import React from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TDirection, IHelpLine, minLength } from "../store/RootStore/interface";
import styled from "styled-components";

export const dirArr: TDirection[] = [
  "n",
  "s",
  "e",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
];

const DraggableHelp = styled.div<IHelpLine>`
  position: absolute;
  display: ${(props) => (props.show ? "block" : "none")};
  top: ${(props) => (props.top !== undefined ? `${props.top}px` : "initial")};
  bottom: ${(props) =>
    props.bottom !== undefined ? `${props.bottom}px` : "initial"};
  left: ${(props) =>
    props.left !== undefined ? `${props.left}px` : "initial"};
  right: ${(props) =>
    props.right !== undefined ? `${props.right}px` : "initial"};
`;

const DraggableHelpW = styled(DraggableHelp)`
  width: ${(props) => (props.width ? ` ${props.width}px` : ` ${minLength}px`)};
  height: 0;
  border-top: 2px dashed rgb(221, 205, 163);
  pointer-events: none;
`;

const DraggableHelpH = styled(DraggableHelp)`
  height: ${(props) =>
    props.height ? ` ${props.height}px` : ` ${minLength}px`};
  width: 0;
  border-left: 2px dashed rgb(221, 205, 163);
`;

const Resize = observer(() => {
  const root = useStore();
  const { commonStore } = root;

  return (
    <>
      {dirArr.map((i) => (
        <div
          key={i}
          className={`canvasTools-draggable-${i}`}
          draggable
          onMouseDown={(e) => {
            commonStore.logic.onDraggleStart(e, i);
          }}
          onDragEnd={(e) => {
            commonStore.logic.onDraggleEnd(e, i);
          }}
          onMouseUp={commonStore.logic.clearStartPoint}
        />
      ))}
      <DraggableHelpW {...commonStore.computed.widthLine} />
      <DraggableHelpH {...commonStore.computed.heightLine} />
    </>
  );
});

export default Resize;
