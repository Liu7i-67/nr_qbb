
import { makeAutoObservable } from '@quarkunlimit/qu-mobx';
import { IHelpLine, minLength } from '../interface'
import { IComputed } from './interface';
import { RootStore } from '../';


export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get width() {
    const { commonStore } = this.rootStore;
    if (commonStore.logic.newWidth !== -1) {
      return commonStore.logic.newWidth
    }
    return commonStore.logic.width
  }

  get height() {
    const { commonStore } = this.rootStore;
    if (commonStore.logic.newHeight !== -1) {
      return commonStore.logic.newHeight
    }
    return commonStore.logic.height
  }

  get widthLine() {
    const { commonStore } = this.rootStore;
    const res: IHelpLine = {
      show: !!commonStore.logic.startPoint.x,
      width: minLength
    }

    switch (commonStore.logic.startPoint.dir) {
      case 'n': {
        res.width = commonStore.logic.width;
        res.bottom = minLength;
      }; break;
      case 's': {
        res.width = commonStore.logic.width;
        res.top = minLength;
      }; break;
      case 'w':
      case 'e': {
        res.show = false;
      }; break;
      case 'ne': {
        res.bottom = minLength;
      }; break;
      case 'se': {
        res.top = minLength;
      }; break;
      case 'nw': {
        res.bottom = minLength;
        res.right = 0;
      }; break;
      case 'sw': {
        res.top = minLength;
        res.right = 0;
      }; break;
    }

    return res;
  }

  get heightLine() {
    const { commonStore } = this.rootStore;
    const res: IHelpLine = {
      show: !!commonStore.logic.startPoint.x,
      height: minLength
    }

    switch (commonStore.logic.startPoint.dir) {
      case 'n':
      case 's': {
        res.show = false;
      }; break;
      case 'e': {
        res.height = commonStore.logic.height;
        res.left = minLength;
      }; break;
      case 'w': {
        res.height = commonStore.logic.height;
        res.right = minLength;
      }; break;
      case 'ne': {
        res.left = minLength;
        res.bottom = 0;
      }; break;
      case 'se': {
        res.left = minLength;
        res.top = 0;
      }; break;
      case 'nw': {
        res.bottom = 0;
        res.right = minLength;
      }; break;
      case 'sw': {
        res.top = 0;
        res.right = minLength;
      }; break;
    }

    return res;
  }
}
