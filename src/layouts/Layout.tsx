/*
 * @Author: liu7i
 * @Date: 2022-04-19 10:54:16
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 16:59:19
 */

import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { classNames } from "utils/Tools";

function Layouts() {
  const [state, setState] = useState({
    /** @param 是否激活 */
    active: false,
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const classNav = useMemo(() => {
    const _className = classNames("Layouts_nav", { active: state.active });
    return _className;
  }, [state.active]);

  const classLink = useMemo(() => {
    const _className = classNames({ dsn: !state.active });
    return _className;
  }, [state.active]);

  const open = useCallback(() => {
    setState((o) => ({
      ...o,
      active: true,
    }));
  }, []);

  const close = useCallback(() => {
    setState((o) => ({
      ...o,
      active: false,
    }));
  }, []);

  return (
    <div className="Layouts">
      <div
        className={classNav}
        onDoubleClick={open}
        onClick={close}
        draggable
        onDragEnd={(e) => {
          setPosition({
            x: e.clientX < 0 ? 0 : e.clientX,
            y: e.clientY < 0 ? 0 : e.clientY,
          });
        }}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          ...(position.y === 0 && position.x === 0 ? {} : { opacity: 1 }),
        }}
      >
        <span>MENU</span>
        <Link to="/" className={classLink}>
          HOME
        </Link>
        <Link to="/table" className={classLink}>
          TABLE
        </Link>
        <Link to="/hook-form" className={classLink}>
          HOOK-FORM
        </Link>
        <Link to="/formik" className={classLink}>
          FORMIK
        </Link>
        <Link to="/test" className={classLink}>
          TEST
        </Link>
        <Link to="/canvas" className={classLink}>
          Canvas工具
        </Link>
        <Link to="/todo" className={classLink}>
          待办事项
        </Link>
        <Link to="/index" className={classLink}>
          IndexedDB
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Layouts;
