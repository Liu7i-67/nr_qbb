/*
 * @Author: liu7i 
 * @Date: 2022-04-25 11:01:03 
 * @Last Modified by:   liu7i 
 * @Last Modified time: 2022-04-25 11:01:03 
 */

import { RootStore } from "../";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IColumnStore } from "./interface";


export class ColumnStore implements IColumnStore {
  logic: Logic;
  computed: Computed;
  constructor(rootStore: RootStore) {
    this.logic = new Logic(rootStore);
    this.computed = new Computed(rootStore);
  }
}
