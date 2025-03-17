import React, { createContext, useState, useEffect } from "react";
import api from '../services/api';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoadin] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@finToken');

            if(storageUser){
                const response = await api.get('/me', {
                    headers:{
                        'Authorization': `Bearer ${storageUser}`
                    }
                })
                .catch(() => {
                    setUser(null);
                })

                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
                setUser(response.data);
                setLoadin(false);
            }

            setLoadin(false);

        }

        loadStorage()
    }, [])

    async function signUp(nome, email, password) {
        setLoadingAuth(true);
        try{
            const response = await api.post('/users', {
                name: nome,
                email: email,
                password: password,
            }) 

            setLoadingAuth(false);
            navigation.goBack();

        }catch(err){
            console.log('Erro ao cadastrar', err);
            setLoadingAuth(false);
        }
    }

    async function signIn(email, password) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            })

            const { id, name, token } = response.data;
            
            const data = {
                id,
                name,
                token,
                email
            };

            await AsyncStorage.setItem('@finToken', token); //salva no AsyncStorage com a chave @finToken o usuário que fez login

            api.defaults.headers['Authorization'] = `Bearer ${token}`; //informa ao axios que esse será o token utilizado nas próximas requisições

            setUser({
                id,
                name,
                email,
            });

            setLoadingAuth(false);
        } catch (error) {
            console.log("ERRO AO LOGAR: ", error)
            setLoadingAuth(false);
        }
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loadingAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;