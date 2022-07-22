/*
 * @Author: liu7i 
 * @Date: 2022-07-14 18:02:05 
 * @Last Modified by:   liu7i 
 * @Last Modified time: 2022-07-14 18:02:05 
 */

import { RootStore } from '../';
import { IPaintStore } from './interface';
import { Logic } from './Logic';
import { Computed } from './Computed';


export class PaintStore implements IPaintStore {
  logic: Logic;
  computed: Computed;
  constructor(rootStore: RootStore) {
    this.logic = new Logic(rootStore);
    this.computed = new Computed(rootStore);
  }
}

