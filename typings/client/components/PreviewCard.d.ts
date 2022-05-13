export default PreviewCard;
declare function PreviewCard({ href, date, image, title, subtitle, username }: {
    href: any;
    date: any;
    image: any;
    title: any;
    subtitle: any;
    username: any;
}): JSX.Element;
declare namespace PreviewCard {
    namespace propTypes {
        const href: PropTypes.Requireable<string>;
        const date: PropTypes.Validator<string>;
        const image: PropTypes.Validator<string>;
        const title: PropTypes.Validator<string>;
        const subtitle: PropTypes.Requireable<string>;
        const username: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        const href_1: any;
        export { href_1 as href };
        const subtitle_1: string;
        export { subtitle_1 as subtitle };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PreviewCard.d.ts.map