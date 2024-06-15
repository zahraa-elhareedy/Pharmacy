import React, {useState} from 'react';
import { StyleSheet, Button, TextInput, Text, View } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submitInfo = async () => {
    let loginData = {
      username: username,
      password: password,
    };
    const apiURL = 'https://portal-test.rxmaxreturns.com/rxmax';
    try{
      const resource = '/auth'
      const response = await axios.post(apiURL + resource, loginData);
      if (response.status == 200) {
        AsyncStorage.setItem("access", response.data.token);
      }
    }catch (error){
      console.log(error);
    }
  };
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Pharmacy Returns</Text>
      <View style={styles.input}>
        <TextInput 
        style={styles.inputField}
        placeholder="Username" value={username}
        placeholderTextColor={'#dcdcdc'}
        onChangeText={setUsername}
        keyboardType='email-address'></TextInput>
        <TextInput 
        style={styles.inputField}
        placeholder="Password" value={password}
        placeholderTextColor={'#dcdcdc'}
        onChangeText={setPassword}
        secureTextEntry></TextInput>
      </View> 
      <View style={styles.loginButton}>
        <Button 
          onPress={submitInfo}
          title="Login"
          color="#fff"
        /></View>
    </View>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    height: 100,
  },
  loginButton: {
    width: '40%',
    height: 40,
    backgroundColor: "#4ecdc4",
    borderRadius: 20,
  },
  input: {
    width: '100%',
    height: 220,
    fontSize: 17,
    color: '#000',
  },
  inputField: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  }
});