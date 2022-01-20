import { settableProps, SetProp, BreakpointValue } from './grid.interfaces';

export function createCssString(setProp: SetProp): string {
  const values = setProp.breakpointValues;
  if (!isBreakpointValuesEmpty(values)) {
    const filledArray = fillEmptyBreakpointValues(values);
    const valuesObj = transformBreakpointValuesData(filledArray);
    const stringSizesArray = Object.entries(valuesObj).map(
      ([key, value]) => `--${setProp.propName}-${key}:${value}`
    );
    return stringSizesArray.join(';') + ';';
  }
}

export function isBreakpointValuesEmpty(values: BreakpointValue[]): boolean {
  let isEmpty = true;
  for (const value of values) {
    if (value.value) {
      isEmpty = false;
      break;
    }
  }
  return isEmpty;
}

export function fillEmptyBreakpointValues(
  values: BreakpointValue[]
): BreakpointValue[] {
  const filledArray = [...values];
  for (let i = 1; i < filledArray.length; i++) {
    if (!filledArray[i].value) {
      filledArray[i].value = filledArray[i - 1].value;
    }
  }

  return filledArray;
}

export function transformBreakpointValuesData(values: BreakpointValue[]) {
  return values.reduce(
    (a, v) => ({
      ...a,
      ...{ [v.breakpointName]: v.value },
    }),
    {}
  );
}

export function propsToBreakpointValuesArray(
  values: string[]
): BreakpointValue[] {
  return [
    { breakpointName: 'sm', value: values[0] },
    { breakpointName: 'md', value: values[1] },
    { breakpointName: 'lg', value: values[2] },
    { breakpointName: 'xl', value: values[3] },
    { breakpointName: 'xxl', value: values[4] },
  ];
}

export function createBreakpointValuedProp(
  propName: settableProps,
  values: string
): SetProp {
  if (!propName || !values) {
    return;
  }

  return {
    propName,
    breakpointValues: propsToBreakpointValuesArray(values.split(',')),
  };
}
