import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

// import * as Animatable from 'react-native-animatable';


const Login = () => {
const navigation = useNavigation<any>();

    const [userName, setUserName] = useState("lala")
    const [password, setPassword] = useState("lulu")
    const clicks= (uName: any, pWord: any)=>{

      // navigation.navigate("Dashboard")

        if (uName === "rhm" && pWord === "123") {
          navigation.navigate("Dashboard")
        }
        else{
          console.warn("Wrong Credential")
        }
    }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="User id"
          // value=''
          onChangeText={(text)=>setUserName(text)}
        // Other TextInput props go here
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          // value=''
          secureTextEntry
          onChangeText={(text)=>setPassword(text)}
        // Other TextInput props go here
        />
        <TouchableOpacity style={styles.submitButton} onPress={()=>clicks(userName, password)}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/favicon.png')} // Replace with the path to your logo
        style={styles.logo}
      />

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // animationContainer: {
  //   position: 'absolute',
  //   top: 50,
  //   alignItems: 'center',
  //   width: '100%',
  // },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    position: 'absolute',
    top: 50,
    resizeMode: 'contain', // Adjust the resizeMode based on your logo aspect ratio
  },
});

export default Login;
