export const getFeedItems: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const getUserCubes: (req: any, res: any, next: any) => Promise<any>;
export const saveShowTagColors: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => void) | import("express-validator").ValidationChain)[];
export const viewNotification: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const clearNotifications: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const followUser: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const unfollowUser: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const viewResetPassword: (req: any, res: any, next: any) => Promise<any>;
export const changePassword: (((req: any, res: any, next: any) => any)[] | ((req: any, _res: any, next: any) => void) | import("express-validator").ValidationChain)[];
export const createUser: (((req: any, _res: any, next: any) => void) | import("express-validator").ValidationChain)[];
export function confirmUser(req: any, res: any): Promise<any>;
export const viewUserPage: (req: any, res: any, next: any) => Promise<any>;
export const viewUserDecks: (req: any, res: any, next: any) => Promise<any>;
export function viewUserBlog(req: any, res: any): Promise<any>;
export const updateUserInfo: (((req: any, res: any, next: any) => any)[] | ((req: any, _res: any, next: any) => void) | import("express-validator").ValidationChain)[];
export const updateDisplaySettings: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any) => Promise<void>))[];
export const updateEmail: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export const viewSocialPage: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any) => Promise<void>))[];
export const viewAccountPage: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export function viewRegisterPage(req: any, res: any): Promise<void>;
export const viewNotifications: (((req: any, res: any, next: any) => any)[] | ((req: any, res: any, next: any) => Promise<any>))[];
export function redirectToFirstPageOfUserDecks(req: any, res: any): any;
export function redirectToFirstPageOfUserBlogPosts(req: any, res: any): any;
export function getUserPackages(req: any, res: any): Promise<any>;
//# sourceMappingURL=user.d.ts.map