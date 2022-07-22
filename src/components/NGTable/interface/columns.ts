/*
 * @Author: liu7i
 * @Date: 2022-04-20 18:07:11
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-22 14:23:12
 */

import { TableProps, ColumnProps } from "antd/lib/table";

export interface IRowItem {
  [key: string]: any;
}

export interface IColumns extends ColumnProps<IRowItem> {
  cantDrag?: boolean;
  key: string;
  display?: string;
  privacy?: boolean;
  isPhone?: boolean;
  autoPrivacyLength?: boolean;
  isPrice?: boolean;
  noFirstValue?: boolean;
  customPrivacy?: boolean;
  searchValue?: string;
  customTitle?: string;
  notDefaultChecked?: boolean;
  minWidth?: number;
  tooltip?: React.ReactNode;
  fixed?: boolean | "right" | "left";
  align?: "right" | "left" | "center";
  ellipse?: boolean;
  ellipseLength?: number;
  decimalNum?: number;
  controlPrivacy?: string;
  render?: (
    text?: any,
    record?: any,
    index?: number,
    customPrivacy?: boolean
  ) => React.ReactNode;
}
