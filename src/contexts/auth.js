import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState({
        nome: 'Caio Teste'
    })

    async function signUp() {
        
    }

    return(
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;