export const ChangelistContextProvider: React.FC<ChangelistContextProviderProps>;
export default ChangelistContext;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type AddChange = {
    id: number;
    add: Card;
};
export type RemoveChange = {
    id: number;
    remove: Card;
};
export type ReplaceChange = {
    id: number;
    replace: [Card, Card];
};
export type Change = AddChange | RemoveChange | ReplaceChange;
export type ChangelistContextValues = {
    changes: Change[];
    setChanges: (changes: Change[]) => void;
    addChanges: (changes: Change[]) => void;
    addChange: (change: Change) => void;
    removeChange: (changeId: number) => void;
    openEditCollapse: () => void;
};
export type ChangelistContextProviderProps = {
    cubeID: string | null;
    setOpenCollapse: (collapse: string) => void;
    initialChanges?: Change[] | undefined;
    noSave?: boolean | undefined;
    children: React.ReactNode;
};
declare const ChangelistContext: React.Context<ChangelistContextValues>;
//# sourceMappingURL=ChangelistContext.d.ts.map