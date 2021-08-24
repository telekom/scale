export interface CheckboxState {
  id: string;
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
}

const objectsEqual = (o1: CheckboxState, o2: CheckboxState) => {
  return typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
        Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;
};

export const objDiffer = (obj1: CheckboxState[], obj2: CheckboxState[]) => {
  let isEqual = false;
  for (let i = 0; i < obj1.length; i++) {
    if (!objectsEqual(obj1[i], obj2[i])) {
      isEqual = true;
      break;
    }
  }
  return isEqual;
};
