/*
 * @Author: liu7i
 * @Date: 2022-07-21 11:33:57
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-08-05 17:48:14
 */

export interface IAny {
  [key: string]: any;
}

export interface IJsonString<T> extends String {
  parse?: T;
}
