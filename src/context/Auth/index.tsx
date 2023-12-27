import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import { ILoginPayload, ISignupPayload, signupService, loginService, IAuthResponse, IProfile } from "../../services/session"; 

export type IAuthProviderProps = {
    children: React.ReactNode;
}

// Define the shape of the context data using a TypeScript interface
type AuthContextData = {
    token?: string | null;
    profile?: IProfile | null;
    login: (payload: ILoginPayload) => void;
    signup: (payload: ISignupPayload) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
    token: null,
    login: () => {},
    signup: () => {},
    logout: () => {},
})

export function useAuth(): any {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children } ) => {

    //TODO: Store token in KeyChain for production applications
    const [token, setToken] = useState<string | null>(null);
    //TODO: move logic to redux for production applicaitons
    const [profile, setProfile] = useState<IProfile | null>(null);

    /**
     * Signup
     * TODO: move logic to redux for production applicaitons
     * @param payload 
     * @returns Promise
     */
    const signup = async (payload: ISignupPayload) => {
        return signupService(payload)
        .then(res => {
            setToken(res?.data?.token)
            setProfile(res?.data?.profile)
            return res?.data
        })
    }


    /**
     * Login
     * TODO: move logic to redux for production applicaitons
     * @param payload 
     * @returns Promise
     */
    const login = async (payload: ILoginPayload) => {
        return loginService(payload)
        .then(res => {
            setToken(res?.data?.token)
            setProfile(res?.data?.profile)
            return res?.data
        })
    }

    const logout = () => {
        setToken(null)
        setProfile(null)
    }

    return (
        <AuthContext.Provider value={{ token, profile, login, signup, logout }} >
            {children}
        </AuthContext.Provider>
    )
}