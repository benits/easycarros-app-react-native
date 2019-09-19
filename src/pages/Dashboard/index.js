import React, { Component } from 'react';
import api from '~/services/api';
import { List, ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';

import { 
  StatusBar, 
  View, Text, 
  TextInput, 
  TouchableOpacity,  
  FlatList
} from 'react-native';


import styles from './styles';


export default class Dashboard extends Component {
  
 state = {
      loggedTkn: '',
      list: [],
      plate: '',
 }
   

  logout = async () => {
    this.props.navigation.navigate('Main');
    AsyncStorage.removeItem('@easycarros:token');       
  };

  
  getList = async () => {
    try {
      const response = await api.get('vehicle');

      const list  = JSON.stringify(response.data.data);

      this.setState({ list: list });
      
      
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

      if (response.ok) {
        this.setState({successMessage: "Adicionado com sucesso!"});
        setTimeout(() => {this.setState({successMessage: ""})}, 1000)
      }
        
     this.getList();
     this.setState({errorMessage: '', plate: ''});
    }catch (response) {
      var erro = response.data.error['message'];

      if (erro === "Should be a valid vehicle plate: XXX0000 ou XXX0X000") {
        this.setState({errorMessage: 'Deve ser uma placa de veículo válida: XXX0000 ou XXX0X000'});
      }
      }

  };

  deleteList = async () => {
    try {
      const { plate } = this.state;
      const response = await api.post('vehicle', {
        plate: plate
      });

      if (response.ok) 
      this.setState({successMessage: 'Adcionado com sucesso'});

     this.getList();
      
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
  
    return(
      <View style={styles.container}>  
      <StatusBar backgroundColor="#3EC3E3" barStyle="light-content"/> 
        <View style={styles.criarContaContainer}>
              <Text style={styles.textTitle}>FROTA</Text>
        </View>
        <View style={styles.criarContaContainer}>
              <Text style={styles.textLight}>Adicione seu novo carro a frota, digite a placa do veiculo</Text>
            </View>
        <View style={styles.form}>
            { !!this.state.successMessage && <View style={styles.containerSuccess}><Text style={styles.textLightError}>{ this.state.successMessage }</Text></View> } 
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
          <View>
            <List>
              <FlatList
                data={this.state.list}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) =>
                  <ListItem
                    title={item.plate}
                  />}
              />
            </List>
          </View>
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


