import React from "react"
import {User} from "../types/User";

export interface UserContext {
    user?: User;
    setUser: (user: User | undefined) => void;
}

const userContext = React.createContext<UserContext>({
    user: undefined,
    setUser: (user) => {}
});

export default userContext;
