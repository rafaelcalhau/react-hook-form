import set from '../utils/set';
import isArray from '../utils/isArray';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import { REGEX_IS_DEEP_PROP } from '../constants';
import { FieldValues } from '../types';

const filterArray = (target: any) => {
  for (const key in target) {
    if (isArray(target[key])) {
      target[key] = target[key].filter((data: any) => !isNullOrUndefined(data));
      filterArray(target[key]);
    }
  }

  return target;
};

export default (data: FieldValues): any =>
  filterArray(
    Object.entries(data).reduce(
      (previous: FieldValues, [key, value]): FieldValues => {
        if (REGEX_IS_DEEP_PROP.test(key)) {
          set(previous, key, value);
          return previous;
        }

        return { ...previous, [key]: value };
      },
      {},
    ),
  );