declare namespace _default {
    export { withMigrations };
    export { applyPendingMigrationsPre };
}
export default _default;
declare function withMigrations(schema: any, migrations: any): any;
declare function applyPendingMigrationsPre(migrations: any): (doc: any) => Promise<any>;
//# sourceMappingURL=migrationMiddleware.d.ts.map