/*
 * @Author: liu7i
 * @Date: 2022-04-27 10:41:35
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-04-27 10:44:59
 */

export interface IProps {
  layout?: "horizontal" | "vertical" | "inline";
  //   list: IList[];
  initialValues?: {
    [key: string]: any;
  };
//   formItemLayout?: IFormItemLayout | {};
  className?: string;
  onFinish?: (values: any) => void;
  //   wrappedComponentRef?: (instance: IWrappedComponentRef) => void;
  //   form?: IFormInstance;
  preserve?: boolean;
  labelAlign?: "left" | "right";
}
