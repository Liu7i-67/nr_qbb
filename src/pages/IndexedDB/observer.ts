/*
 * @Author: liu7i
 * @Date: 2022-07-20 13:47:02
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-20 13:58:12
 */

interface IAny {
  [key: string]: any;
}

export class ObserverList {
  observerList: IAny[];
  constructor() {
    this.observerList = [];
  }

  add(obj: IAny) {
    return this.observerList.push(obj);
  }

  count() {
    return this.observerList.length;
  }

  get(index: number) {
    if (index < 0) {
      return undefined;
    }

    if (Math.floor(index) !== index) {
      return undefined;
    }

    if (index >= this.observerList.length) {
      return undefined;
    }

    return this.observerList[index];
  }

  indexof(obj: IAny, startIndex: number) {
    let i = startIndex;
    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i;
      }
      i++;
    }
    return -1;
  }

  removeAt(index: number) {
    this.observerList.splice(index, 1);
  }
}

export class Subject {
  observers: ObserverList;
  constructor() {
    this.observers = new ObserverList();
  }

  addObserver(obs: IAny) {
    this.observers.add(obs);
  }

  removerObserver(obs: IAny) {
    this.observers.removeAt(this.observers.indexof(obs, 0));
  }

  notify(content: IAny) {
    const observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
      this.observers?.get(i)?.update?.(content);
    }
  }
}
