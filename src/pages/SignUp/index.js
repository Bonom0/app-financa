import React, { useContext } from "react";
import { Platform } from 'react-native'
import { 
    Background, 
    Container, 
    AreaInput, 
    Input, 
    SubmitButton, 
    SubmitText 
} from '../SignIn/styles'
import { AuthContext } from "../../contexts/auth";

export default function SignIn(){
    const { user } = useContext(AuthContext)
    
    return(
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
            
                <AreaInput>
                    <Input
                        placeholder="Nome"
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Seu E-mail"
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Sua senha"
                    />
                </AreaInput>

                <SubmitButton>
                    <SubmitText>Cadastrar</SubmitText>
                </SubmitButton>
            </Container>
        </Background>
    )
}