import type { Patch } from '@cubeartisan/cubeartisan/types/patch';

export const getApplyFunc = <T>(val: T) => {
  if (Array.isArray(val)) {
    // eslint-disable-next-line no-use-before-define
    return applyArrayPatch;
  }
  // eslint-disable-next-line no-use-before-define
  if (val !== null && typeof val === 'object') return applyObjectPatch;
  // eslint-disable-next-line no-use-before-define
  return applyValuePatch;
};

export const applyValuePatch = <T>(_: T, patch: T): T => patch;

const calculateIndex = (index: number, length: number, addedIndices: number[], numRemoved: number): number => {
  const indices = new Array(length + numRemoved).fill(1);
  for (const i of addedIndices) indices[i] = 0;
  let sum = 0;
  let i = 0;
  for (const x of indices) {
    if (sum >= index && x !== 0) break;
    sum += x;
    i += 1;
  }
  return i;
};

const calculateInsertIndex = (index: number, length: number, addedIndices: number[], numRemoved: number): number => {
  if (index === 0) return 0;
  const indices = new Array(length + numRemoved).fill(1);
  for (const i of addedIndices) indices[i] = 0;
  if (index < 0) {
    // Reindex from the beginning.
    index = length + numRemoved - addedIndices.length + index + 1;
  }
  let sum = 0;
  let i = 0;
  for (const x of indices) {
    sum += x;
    i += 1;
    if (sum >= index) break;
  }
  return i;
};

export const applyArrayPatch = <T>(arr: T[], patches: Patch<T[]>): T[] => {
  if (!arr || !arr.length) arr = [];
  arr = Array.from(arr);
  const addedIndices: number[] = [];
  let numRemoved = 0;
  for (const patch of patches) {
    if (patch.action === 'add') {
      const index = calculateInsertIndex(patch.index, arr.length, addedIndices, numRemoved);
      arr.splice(index, 0, patch.value);
      addedIndices.push(index);
    } else if (patch.action === 'remove') {
      const index = calculateIndex(patch.index, arr.length, addedIndices, numRemoved);
      arr.splice(index, 1);
      numRemoved += 1;
    } else if (patch.action === 'update') {
      const index = calculateIndex(patch.index, arr.length, addedIndices, numRemoved);
      if (arr.length <= index || index < 0)
        throw new Error(
          `Update index ${patch.index} resolved to ${index} which is not a valid index into an array of length ${arr}`,
        );
      // eslint-disable-next-line no-use-before-define
      arr[index] = applyPatch(arr[index]!, patch.patch);
    } else if (patch.action === 'copy') {
      const src = calculateIndex(patch.index, arr.length, addedIndices, numRemoved);
      const dest = calculateInsertIndex(patch.dest, arr.length, addedIndices, numRemoved);
      if (arr.length <= src || src < 0)
        throw new Error(
          `Source index for copy ${patch.index} resolved to ${src} which is not a valid index into an array of length ${arr}`,
        );
      arr.splice(dest, 0, arr[src]!);
      addedIndices.push(dest);
    } else if (patch.action === 'move') {
      const src = calculateIndex(patch.index, arr.length, addedIndices, numRemoved);
      const dest = calculateInsertIndex(patch.dest, arr.length, addedIndices, numRemoved);
      if (arr.length <= src || src < 0)
        throw new Error(
          `Source index for move ${patch.index} resolved to ${src} which is not a valid index into an array of length ${arr}`,
        );
      arr.splice(dest, 0, arr[src]!);
      addedIndices.push(dest);
      const index = calculateIndex(patch.index, arr.length, addedIndices, numRemoved);
      arr.splice(index, 1);
      numRemoved += 1;
    }
  }
  return arr;
};

export const applyObjectPatch = <T extends object>(obj: T, patch: Patch<T>): T => {
  obj = { ...obj };
  for (const keyP of Object.keys(patch)) {
    const key = keyP as keyof T & keyof Patch<T>;
    const patchValue = patch[key] as Patch<T[typeof key]>;
    if (typeof patchValue === 'undefined') {
      delete obj[key];
    } else {
      // eslint-disable-next-line no-use-before-define
      obj[key] = applyPatch(obj[key], patchValue);
    }
  }
  return obj;
};

export const applyPatch = <T>(obj: T, patch: Patch<T>): T => {
  const applyFunc = getApplyFunc(patch) as (t: T, p: Patch<T>) => T;
  return applyFunc(obj, patch);
};
