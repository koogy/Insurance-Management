import React, { ReactNode, useState } from "react"

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    city: string,
    postalCode: string,
    phoneNumber: string,
    address: string,
    isAdmin: boolean
}

export interface IAuth {
    currentUser: User | undefined,
    loginUser: (user : User) => void
    logout: () => void;
}

export const AuthContext = React.createContext<IAuth>({} as IAuth)

interface AuthProviderProps {
    children?: ReactNode,
}

function getInitialState() {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : undefined
}

export const AuthProvider = ({children} : AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState(getInitialState)

    const loginUser = (user : User) => {
        localStorage.setItem("user", JSON.stringify(user))
        setCurrentUser(user)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setCurrentUser(undefined)
    }

    return (
        <AuthContext.Provider value={{currentUser, loginUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return React.useContext(AuthContext)
}