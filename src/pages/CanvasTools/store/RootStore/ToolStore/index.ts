/*
 * @Author: liu7i
 * @Date: 2022-07-15 10:56:13
 * @Last Modified by:   liu7i
 * @Last Modified time: 2022-07-15 10:56:13
 */

import { RootStore } from "../";
import { IToolStore } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";

export class ToolStore implements IToolStore {
  logic: Logic;
  computed: Computed;
  constructor(rootStore: RootStore) {
    this.logic = new Logic(rootStore);
    this.computed = new Computed(rootStore);
  }
}
