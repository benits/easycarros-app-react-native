import React, { Component } from 'react';
import api from '~/services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { 
  StatusBar, 
  View, Text, 
  TextInput, 
  TouchableOpacity,  
  Image,
} from 'react-native';


import styles from './styles';


export default class Dashboard extends Component {
  
 state = {
      loggedTkn: '',
      list: [],
      plate: ''
 }
   

  logout = async () => {
    this.props.navigation.navigate('Main');
    AsyncStorage.removeItem('@easycarros:token');       
  };

  
  getList = async () => {
    try {
      const response = await api.get('vehicle');

      const { list } = response.data;

      this.setState({ list });
      
      
    }catch (response) {
      var erro = response.data.error['message'];

      if (erro === "Authentication required!") {
        this.setState({errorMessage: 'Autenticação requerida'});
      }
      }

  };

  postList = async () => {
    try {
      const { plate } = this.state;
      const response = await api.post('vehicle', {
        plate: plate
      });

      const { list } = response.data.data['data'];

      this.setState({ list })
      
    }catch (response) {
      var erro = response.data.error['message'];

      if (erro === "Should be a valid vehicle plate: XXX0000 ou XXX0X000") {
        this.setState({errorMessage: 'Deve ser uma placa de veículo válida: XXX0000 ou XXX0X000'});
      }
      }

  };

 
  async componentDidMount() {
    const token = await AsyncStorage.getItem('@easycarros:token');

    if (token) {
      this.getList();
    } else {
      this.props.navigation.navigate('Main');
    }
  }
 


  render() {
    const { plate } = this.state;
    const {list} = this.state;
    return(
      <View style={styles.container}>  
      <StatusBar backgroundColor="#3EC3E3" barStyle="light-content"/> 
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logolight.png')}></Image>
        </View>
        <View style={styles.form}>
            <View style={styles.criarContaContainer}>
              <Text style={styles.textLight}>Adicione seu novo carro a frota, digite a placa do veiculo</Text>
            </View>
            <View style={styles.row}>
              <TextInput 
                  style={styles.input}
                  autoCapitalize= "none"
                  autoCorrect= {false}
                  maxLength= {7}
                  placeholder= "Digite a placa do seu veiculo"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  underlineColorAndroid= "transparent" 
                  value={plate}
                  onChangeText={
                  text => this.setState({ plate: text })
                  }  
              ></TextInput>
              <TouchableOpacity style={styles.button} onPress={this.postList}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
            { !!this.state.errorMessage && <View style={styles.containerError}><Text style={styles.textLightError}>{ this.state.errorMessage }</Text></View> }           
        </View>
        <View style={styles.listContainer}>
            { this.state.list.map(projetct => 
                <View hey={projetct.id} style={{ marginTop: 15 }}>
                  <Text style={{ fontWeight: "bold" }}>{projetct.plate}</Text>
                </View>
              ) }
        </View>
        <View style={ styles.row }>
          <TouchableOpacity style={styles.button} onPress={this.getList}>
                  <Text style={styles.buttonText}>Atualiza</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.buttonLogout} onPress={this.logout}>
                  <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>   
      </View>
    )
  }
  
};


