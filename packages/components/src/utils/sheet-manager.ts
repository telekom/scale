import jss, { SheetsManager } from 'jss';

class ScaleSheetManager {
  sheetManager = new SheetsManager();
  keyMap = new Map();
  _get(key) {
    const keyObj = this.keyMap.get(key);
    return this.sheetManager.get(keyObj);
  }
  _set(key, sheet) {
    const keyObj = { key };
    this.keyMap.set(key, keyObj);
    this.sheetManager.add(keyObj, sheet);
  }
  _manage(key) {
    this.sheetManager.manage(this.keyMap.get(key));
  }
  unmanage(key) {
    this.sheetManager.unmanage(this.keyMap.get(key));
  }
  load(prevKey, nextKey, injectedValues) {
    if (prevKey && prevKey !== nextKey) {
      this.unmanage(prevKey);
    }

    const oldSheet = this._get(nextKey);

    const newSheet =
      !oldSheet && jss.createStyleSheet(injectedValues, { link: true });

    if (newSheet) {
      this._set(nextKey, newSheet);
    }
    this._manage(nextKey);

    return oldSheet || newSheet;
  }
}

const manager = new ScaleSheetManager();

export default manager;
