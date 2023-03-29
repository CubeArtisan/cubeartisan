export type ArrayAddChange<T> = {
  action: 'add';
  index: number;
  value: T;
};

type ArrayRemoveChange = {
  action: 'remove';
  index: number;
};

type ArrayUpdateChange<T> = {
  action: 'update';
  index: number;
  // eslint-disable-next-line no-use-before-define
  patch: Patch<T>;
};

type ArrayCopyChange = {
  action: 'copy';
  index: number;
  dest: number;
};

type ArrayMoveChange = {
  action: 'move';
  index: number;
  dest: number;
};

type ArrayChange<T> = ArrayAddChange<T> | ArrayRemoveChange | ArrayUpdateChange<T> | ArrayCopyChange | ArrayMoveChange;

export type PatchMerge<T> = [{ action: 'merge'; patch: T }];

export type Patch<T> = T extends (infer Item)[]
  ? ArrayChange<Item>[]
  : T extends object
  ? { [Property in keyof T]?: Patch<T[Property]> } | PatchMerge<T>
  : T;
