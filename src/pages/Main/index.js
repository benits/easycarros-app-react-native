import React, { Component } from 'react';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { 
  StatusBar, 
  View, Text, 
  TextInput, 
  TouchableOpacity, 
  Image 
} from 'react-native';

import styles from './styles';


export default class Main extends Component {
  state = {
    loggedTkn: null,
    useremail: useremail,
    password: password,
    errorMessage: null
    
  };
  
  
  signIn = async () => {
    try {
      const { useremail } = this.state;
      const { password } = this.state;

      const response = await api.post('auth', {        
        email: useremail,
        password: password
      });

      const token = response.data.data['token']

      await AsyncStorage.multiSet([
        ['@easycarros:token', token]
      ]);


      this.setState({ loggedTkn: token });
   
      this.props.navigation.navigate('Dashboard');
      
    } catch (response) {
      var erro = response.data.error['message'];

      switch (erro) {
        case 'Invalid credentials':
            this.setState({errorMessage: 'Email ou senha incorreta'});
            break;
        case 'email is a required field':
            this.setState({errorMessage: 'E-mail Obrigatório'});
            break;
        case 'password is a required field':
            this.setState({errorMessage: 'Senha Obrigatória'});
            break;
        default:
            this.setState({errorMessage: null});
      }

      
      
    };
    

  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@easycarros:token')
    
    if (token) {
      this.setState({ loggedTkn: token });
      this.props.navigation.navigate('Dashboard');
      
    }
  }
  
  render() {
    const { useremail, password } = this.state;

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor="#3EC3E3" barStyle="light-content"/>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.png')}></Image>
        </View>
        <View style={styles.form}>
            { !!this.state.errorMessage && <View style={styles.containerError}><Text style={styles.textLightError}>{ this.state.errorMessage }</Text></View> }
            <TextInput 
                style={styles.input}
                autoCapitalize= "none"
                autoCorrect= {false}
                placeholder= "Digite seu e-mail"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                underlineColorAndroid= "transparent"
                value={useremail}
                onChangeText={
                  text => this.setState({ useremail: text })
                }
            ></TextInput>
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                autoCapitalize= "none"
                autoCorrect= {false}
                placeholder= "Digite sua senha"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                underlineColorAndroid= "transparent"
                value={password}
                onChangeText={
                  text => this.setState({ password: text })
                }
            ></TextInput>
            <TouchableOpacity style={styles.button} onPress={this.signIn}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.criarContaContainer}>
              <Text style={styles.textLight}>Não tem conta?  <Text style={styles.textCriarConta}>Criar Agora</Text></Text>
            </View>
        </View>
      </View>
    )
  }
};



