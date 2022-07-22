/*
 * @Author: liu7i 
 * @Date: 2022-04-25 10:59:31 
 * @Last Modified by:   liu7i 
 * @Last Modified time: 2022-04-25 10:59:31 
 */

import { RootStore } from "../";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IMainStore } from "./interface";

export class MainStore implements IMainStore {
  logic: Logic;
  computed: Computed;
  constructor(rootStore: RootStore) {
    this.logic = new Logic(rootStore);
    this.computed = new Computed(rootStore);
  }
}
