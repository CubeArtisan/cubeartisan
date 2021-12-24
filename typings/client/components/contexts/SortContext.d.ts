export class SortContextProvider extends React.Component<any, any, any> {
    constructor(props: any);
    changeSort(change: any): void;
}
export namespace SortContextProvider {
    namespace propTypes {
        const defaultSorts: PropTypes.Validator<string[]>;
        const showOther: PropTypes.Validator<boolean>;
    }
}
export default SortContext;
import React from "react";
import PropTypes from "prop-types";
declare const SortContext: React.Context<{
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    showOther: boolean;
}>;
//# sourceMappingURL=SortContext.d.ts.map