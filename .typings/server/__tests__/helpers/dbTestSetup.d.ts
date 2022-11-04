declare namespace _default {
    export { connect };
    export { close };
}
export default _default;
declare function connect(): Promise<MongoMemoryServer>;
declare function close(mongoServer: any): Promise<void>;
import { MongoMemoryServer } from "mongodb-memory-server-core";
//# sourceMappingURL=dbTestSetup.d.ts.map