import React, { createContext, useState } from "react";
import api from '../services/api';
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState({
        nome: 'Caio Teste'
    })

    const navigation = useNavigation();

    async function signUp(nome, email, password) {
        try{
            const response = await api.post('/users', {
                name: nome,
                email: email,
                password: password,
            }) 

            navigation.goBack();

        }catch(err){
            console.log('Erro ao cadastrar', err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;