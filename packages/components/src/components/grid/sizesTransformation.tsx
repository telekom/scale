import { sizableProps, SizedProp, Sizes } from './grid.interfaces';

export function propsToSizesArray(sizes: string[]): Sizes[] {
  return [
    { columnName: 'sm', size: sizes[0] },
    { columnName: 'md', size: sizes[1] },
    { columnName: 'lg', size: sizes[2] },
    { columnName: 'xl', size: sizes[3] },
    { columnName: 'xxl', size: sizes[4] },
  ];
}

export function isSizesEmpty(sizes: Sizes[]): boolean {
  let isEmpty = true;
  for (const size of sizes) {
    if (size.size) {
      isEmpty = false;
      break;
    }
  }
  return isEmpty;
}

export function fillEmptySizes(sizes: Sizes[]): Sizes[] {
  const filledArray = [...sizes];
  for (let i = 1; i < filledArray.length; i++) {
    if (!filledArray[i].size) {
      filledArray[i].size = filledArray[i - 1].size;
    }
  }
  return filledArray;
}

export function transformSizesData(sizes: Sizes[]) {
  return sizes.reduce(
    (a, v) => ({
      ...a,
      ...{ [v.columnName]: v.size },
    }),
    {}
  );
}
export function createCssString(sizedProp: SizedProp): string {
  const sizes = sizedProp.sizes;
  if (!isSizesEmpty(sizes)) {
    const filledArray = fillEmptySizes(sizes);
    const sizesObj = transformSizesData(filledArray);
    const stringSizesArray = Object.entries(sizesObj).map(
      ([key, value]) => `--${sizedProp.propName}-${key}:${value}`
    );
    return stringSizesArray.join(';') + ';';
  }
}

export function createSizedProp(
  propName: sizableProps,
  sizes: string
): SizedProp {
  if (!propName || !sizes) {
    return;
  }
  return { propName, sizes: propsToSizesArray(sizes.split(',')) };
}
