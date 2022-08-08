import App from "./App";
import { ConfigProvider } from "antd";
import "moment/locale/zh-cn";
import moment from "moment";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./assets/iconfonts/iconfont.css";
import "antd/dist/antd.less";
import "./index.scss";

moment.locale("zh-cn");

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider
      locale={{ locale: "zh_CN", DatePicker: locale, TimePicker: locale }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
