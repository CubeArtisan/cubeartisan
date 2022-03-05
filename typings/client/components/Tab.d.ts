export default Tab;
declare function Tab({ tab, setTab, index, children }: {
    tab: any;
    setTab: any;
    index: any;
    children: any;
}): JSX.Element;
declare namespace Tab {
    namespace propTypes {
        const tab: PropTypes.Validator<string>;
        const setTab: PropTypes.Validator<(...args: any[]) => any>;
        const index: PropTypes.Validator<string>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Tab.d.ts.map