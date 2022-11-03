export default Suspense;
export type SuspenseProps = {
    fallback?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null | undefined;
    children: React.ReactNode;
};
declare const Suspense: React.FC<SuspenseProps>;
//# sourceMappingURL=Suspense.d.ts.map