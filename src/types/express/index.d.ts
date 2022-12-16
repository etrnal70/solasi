import { UserAuth } from "../custom";

export { };

declare global {
    namespace Express {
        export interface Request {
            user: UserAuth;
        }
    }
}
