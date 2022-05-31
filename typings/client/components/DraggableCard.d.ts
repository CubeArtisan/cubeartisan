export default DraggableCard;
declare function DraggableCard({ card, location, canDrop, onMoveCard, className, onClick, ...props }: {
    [x: string]: any;
    card: any;
    location: any;
    canDrop: any;
    onMoveCard: any;
    className: any;
    onClick: any;
}): JSX.Element;
declare namespace DraggableCard {
    namespace propTypes {
        const card: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            tags: PropTypes.Requireable<(string | null | undefined)[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
                image_flip: PropTypes.Requireable<string>;
                image_small: PropTypes.Requireable<string>;
            }>>;
            addedTmsp: PropTypes.Requireable<string>;
        }>>;
        const location: PropTypes.Validator<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            data: PropTypes.Validator<number[]>;
        }>>;
        const canDrop: PropTypes.Validator<(...args: any[]) => any>;
        const onMoveCard: PropTypes.Validator<(...args: any[]) => any>;
        const className: PropTypes.Requireable<string>;
        const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const className_1: null;
        export { className_1 as className };
        const onClick_1: null;
        export { onClick_1 as onClick };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DraggableCard.d.ts.map