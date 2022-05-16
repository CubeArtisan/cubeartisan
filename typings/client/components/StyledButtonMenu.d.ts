export default StyledButtonMenu;
declare function StyledButtonMenu({ tooltip, menuItems, color, children }: {
    tooltip: any;
    menuItems: any;
    color: any;
    children: any;
}): JSX.Element;
declare namespace StyledButtonMenu {
    namespace propTypes {
        const menuItems: PropTypes.Requireable<PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            link: PropTypes.Requireable<string>;
            onClick: PropTypes.Requireable<(...args: any[]) => any>;
            component: PropTypes.Requireable<(...args: any[]) => any>;
            extraProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        }>[]>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const tooltip: PropTypes.Requireable<string>;
        const color: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const menuItems_1: any[];
        export { menuItems_1 as menuItems };
        export { MenuIcon as children };
        const tooltip_1: any;
        export { tooltip_1 as tooltip };
        const color_1: string;
        export { color_1 as color };
    }
}
import PropTypes from "prop-types";
import { Menu as MenuIcon } from "@mui/icons-material";
//# sourceMappingURL=StyledButtonMenu.d.ts.map