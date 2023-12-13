import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";

export interface IAppState {
    version: string;
}

export interface IAppProps {
    children: ReactNode;
}

const AppStateContext = createContext<IAppState | undefined>(undefined);


export const AppStateProvider = ({children}: IAppProps) => {


    const value = useMemo(() => {
        return {
            version: "0.0.1",
        }
    }, []);

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppStateProvider')
    }
    return context
}