export default SampleHandModal;
declare class SampleHandModal extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        isOpen: boolean;
        hand: never[];
        pool: never[];
    };
    open(event: any): void;
    close(): void;
    refresh(): void;
    draw(): void;
    render(): JSX.Element;
}
declare namespace SampleHandModal {
    namespace propTypes {
        const deck: PropTypes.Validator<any[]>;
    }
}
import React from "react";
import PropTypes from "prop-types";
//# sourceMappingURL=SampleHandModal.d.ts.map