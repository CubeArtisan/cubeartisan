export function getPackages(req: any, res: any, filter: any): Promise<any>;
export function getApprovedPackages(req: any, res: any): Promise<any>;
export function getPendingPackages(req: any, res: any): Promise<any>;
export function getAllPackages(req: any, res: any): Promise<any>;
export const submitPackage: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const upvotePackage: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const downvotePackage: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const approvePackage: ((req: any, res: any, next: any) => any)[];
export const unapprovePackage: ((req: any, res: any, next: any) => any)[];
export const deletePackage: ((req: any, res: any, next: any) => any)[];
export const viewPackage: (req: any, res: any, next: any) => Promise<any>;
//# sourceMappingURL=package.d.ts.map