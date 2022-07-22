/*
 * @Author: liu7i
 * @Date: 2022-04-19 10:54:16
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-13 11:39:23
 */

import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { classNames } from "utils/Tools";

const Layouts = () => {
  const [state, setState] = useState({
    /** @param 是否激活 */
    active: false,
  });

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
      <div className={classNav} onDoubleClick={open} onClick={close} draggable>
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
      </div>
      <Outlet />
    </div>
  );
};

export default Layouts;
