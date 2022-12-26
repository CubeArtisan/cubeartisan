type ArrayAddChange<T> = {
  type: 'add';
  index: number;
  value: T;
};

type ArrayRemoveChange = {
  type: 'remove';
  index: number;
};

type ArrayUpdateChange<T> = {
  type: 'update';
  index: number;
  // eslint-disable-next-line no-use-before-define
  patch: Patch<T>;
};

type ArrayCopyChange = {
  type: 'copy';
  index: number;
  dest: number;
};

type ArrayMoveChange = {
  type: 'move';
  index: number;
  dest: number;
};

type ArrayChange<T> = ArrayAddChange<T> | ArrayRemoveChange | ArrayUpdateChange<T> | ArrayCopyChange | ArrayMoveChange;

export type Patch<T> = T extends (infer Item)[]
  ? ArrayChange<Item>[]
  : T extends object
  ? { [Property in keyof T]?: Patch<T[Property]> }
  : T;
