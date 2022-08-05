/*
 * @Author: liu7i
 * @Date: 2022-07-19 10:37:16
 * @Last Modified by: liu7i
 * @Last Modified time: 2022-07-19 10:43:28
 */

export class CsMonster {
  /** @parma 怪物名称 */
  name: string;
  constructor(init: { name: string }) {
    this.name = init.name;
  }

  atk(sp?: boolean) {
    if (sp) {
      this.#sleep();
      return;
    }
    console.log(`${this.name}发起了一次攻击`);
  }

  #sleep() {
    console.log(`${this.name}开始睡觉`);
  }

  private escape() {
    console.log(`${this.name}开始逃跑`);
  }
}
