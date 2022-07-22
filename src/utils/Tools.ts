/*
 * @Author: liu7i
 * @Date: 2022-04-20 10:58:10
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-21 17:00:16
 */

/** @function 组合className */
export const classNames = (...arg: (string | { [key: string]: boolean })[]) => {
  let nameArr: string[] = [];
  arg?.forEach?.((i) => {
    switch (typeof i) {
      case "string":
        {
          nameArr.push(i);
        }
        break;
      case "object": {
        Object.keys(i).forEach((j) => {
          if (i[j]) {
            nameArr.push(j);
          }
        });
      }
    }
  });
  return nameArr.join(" ");
};

export const tuple = <T extends string[]>(...args: T) => args;

/**
 * 格式化数字
 * 千分位分割，保留两位小数
 */
export const formatNumber = (s: number, decimalNum: number = 2) => {
  if (!s) {
    return "0.00";
  }
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimalNum,
    maximumFractionDigits: decimalNum,
  }).format(+s);
};

export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }

      return [err, undefined];
    });
}
