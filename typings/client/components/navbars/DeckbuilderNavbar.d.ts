export default DeckbuilderNavbar;
declare function DeckbuilderNavbar({ deck, addBasics, name, description, className, setSideboard, setDeck, ...props }: {
    [x: string]: any;
    deck: any;
    addBasics: any;
    name: any;
    description: any;
    className: any;
    setSideboard: any;
    setDeck: any;
}): JSX.Element;
declare namespace DeckbuilderNavbar {
    namespace propTypes {
        const deck: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<(PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<(number | null | undefined)[][][]>;
                sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<(string | null | undefined)[]>;
                name: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
            basics: PropTypes.Validator<number[]>;
        }>>;
        const addBasics: PropTypes.Validator<(...args: any[]) => any>;
        const name: PropTypes.Validator<string>;
        const description: PropTypes.Validator<string>;
        const className: PropTypes.Requireable<string>;
        const setDeck: PropTypes.Validator<(...args: any[]) => any>;
        const setSideboard: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const className_1: null;
        export { className_1 as className };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DeckbuilderNavbar.d.ts.map