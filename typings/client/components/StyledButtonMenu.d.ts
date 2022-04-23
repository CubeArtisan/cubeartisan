export default StyledButtonMenu;
declare function StyledButtonMenu({ tooltip, menuItems, children }: {
    tooltip: any;
    menuItems: any;
    children: any;
}): JSX.Element;
declare namespace StyledButtonMenu {
    namespace propTypes {
        const menuItems: PropTypes.Requireable<PropTypes.InferProps<{
            text: PropTypes.Requireable<string>;
            link: PropTypes.Requireable<string>;
            onClick: PropTypes.Requireable<(...args: any[]) => any>;
            component: PropTypes.Requireable<(...args: any[]) => any>;
        }>[]>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const tooltip: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const menuItems_1: any[];
        export { menuItems_1 as menuItems };
        export { MenuIcon as children };
        const tooltip_1: any;
        export { tooltip_1 as tooltip };
    }
}
import PropTypes from "prop-types";
import { Menu as MenuIcon } from "@mui/icons-material";
//# sourceMappingURL=StyledButtonMenu.d.ts.map