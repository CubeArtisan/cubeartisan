export default LinkButton;
declare function LinkButton({ children, onClick, ...props }: {
    [x: string]: any;
    children: any;
    onClick: any;
}): JSX.Element;
declare namespace LinkButton {
    namespace propTypes {
        const onClick: PropTypes.Validator<(...args: any[]) => any>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=LinkButton.d.ts.map