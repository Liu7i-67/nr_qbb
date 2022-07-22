/*
 * @Author: liu7i
 * @Date: 2022-04-19 10:57:26
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-19 11:01:25
 */

import { useRoutes } from "react-router-dom";
import { router } from "@/config/router";

function App() {
  const _router = useRoutes(router);
  return <div>{_router}</div>;
}

export default App;
