export default StyledButtonMenu;
declare function StyledButtonMenu({ component: Component, tooltip, menuItems, color, arrow, children }: {
    component: any;
    tooltip: any;
    menuItems: any;
    color: any;
    arrow: any;
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
        const arrow: PropTypes.Requireable<boolean>;
        const component: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    }
    namespace defaultProps {
        const menuItems_1: any[];
        export { menuItems_1 as menuItems };
        const children_1: JSX.Element;
        export { children_1 as children };
        const tooltip_1: any;
        export { tooltip_1 as tooltip };
        const color_1: string;
        export { color_1 as color };
        const arrow_1: boolean;
        export { arrow_1 as arrow };
        export { Button as component };
    }
}
import PropTypes from "prop-types";
import { Button } from "@mui/material";
//# sourceMappingURL=StyledButtonMenu.d.ts.map