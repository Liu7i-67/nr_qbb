/*
 * @Author: liu7i
 * @Date: 2022-07-13 11:34:28
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-15 10:34:19
 */

import React from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore, Provider } from "./store/RootStore";
import ToolBar from "./modules/ToolBar";
import Resize from "./modules/Resize";
import "./index.scss";

const CanvasTools = observer(() => {
  const root = useStore();
  const { commonStore, paintStore } = root;

  return (
    <div className="page-canvasTools">
      <ToolBar />
      <div className="canvasTools-box">
        <Resize />
        <canvas
          ref={root.el}
          className="canvasTools"
          width={`${commonStore.logic.width}px`}
          height={`${commonStore.logic.height}px`}
          onMouseDown={paintStore.logic.onMouseDown}
          onMouseMove={paintStore.logic.onMouseMove}
          onMouseUp={paintStore.logic.onMouseUp}
          onMouseLeave={paintStore.logic.onMouseLeave}
        ></canvas>
      </div>
    </div>
  );
});

export default observer(() => (
  <Provider>
    <CanvasTools />
  </Provider>
));
