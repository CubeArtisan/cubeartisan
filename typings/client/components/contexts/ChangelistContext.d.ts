export function ChangelistContextProvider({ cubeID, setOpenCollapse, initialChanges, noSave, ...props }: {
    [x: string]: any;
    cubeID: any;
    setOpenCollapse: any;
    initialChanges: any;
    noSave: any;
}): JSX.Element;
export namespace ChangelistContextProvider {
    namespace propTypes {
        const cubeID: PropTypes.Validator<string>;
        const setOpenCollapse: PropTypes.Validator<(...args: any[]) => any>;
        const initialChanges: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const noSave: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const initialChanges_1: never[];
        export { initialChanges_1 as initialChanges };
        const noSave_1: boolean;
        export { noSave_1 as noSave };
    }
}
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
    replace: any;
};
export type Change = AddChange | RemoveChange | ReplaceChange;
export type ChangelistContextValue = React.Context<import("react").Context<ChangelistContextValue>>;
import PropTypes from "prop-types";
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef AddChange
 * @property {number} id
 * @property {Card} add
 * @typedef RemoveChange
 * @property {number} id
 * @property {Card} remove
 * @typedef ReplaceChange
 * @property {number} id
 * @property {Card[2]} replace
 * @typedef {AddChange | RemoveChange | ReplaceChange} Change
 * @typedef ChangelistContextValue
 * @property {Change[]} changes
 * @property {(changes: Change[]) => void} setChanges
 * @property {(changes: Change[]) => void} addChanges
 * @property {(change: Change) => void} addChange
 * @property {(changeId: number) => void} removeChange
 * @property {() => void} openEditCollapse
 * @type {React.Context<ChangelistContextValue>}
 */
declare const ChangelistContext: import("react").Context<{}>;
//# sourceMappingURL=ChangelistContext.d.ts.map