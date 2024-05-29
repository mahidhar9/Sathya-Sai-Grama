import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {auth} from '../auth/firebaseConfig';
import { getAccessFromRefresh } from '../components/RefreshToken';
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {APP_OWNER_NAME, APP_LINK_NAME, BASE_APP_URL} from "@env"

const Register = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [password, setPassword] = useState()

  const handleRegForm = async (userCred) => {
    setLoading(true);
    console.log(userCred.email)
    //check data exists
    const appOwnerName = APP_OWNER_NAME // Replace with your actual Zoho app owner name
    const appLinkName = APP_LINK_NAME; // Replace with your actual app link name
    const reportName = 'All_App_Users'; // Replace with your actual report name
    const url = `${BASE_APP_URL}/${appOwnerName}/${appLinkName}/report/${reportName}?criteria=Email=="${userCred.email}"`; // Replace with your actual Zoho Creator URL

    
    console.log(url)
    try {
      const access_token = await getAccessFromRefresh()
      console.log(access_token)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`
        },
        params: { 
          criteria:`Email=="${userCred.email}"`
        }
      });    

      console.log('res: ',response)
      const data = await response.json();
      if (data.data && data.data.length > 0) { 
        //authentication       
        console.log("true")
        console.log(userCred.email,userCred.password)
        try {
          const userCredential = await createUserWithEmailAndPassword(auth,userCred.email,userCred.password);
          sendEmailVerification(auth.currentUser)
          const email = userCred.email;
          const id = data.data.json().ID;
          console.log(id)
          setLoading(false);
          navigation.navigate('VerficationNotice',{email,id});
        } catch (error) {
          setLoading(false);
          if (error.message === 'Network request failed') 
            Alert.alert('Network Error', 'Failed to fetch data. Please check your network connection and try again.');
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          } else {
            Alert.alert('Error in creating account:', error.message);
          }
          console.log('Error in auth: ', error);
        }        
      } else {
        setLoading(false);
        Alert.alert("data not exist")
        console.log(("false"))
      }
    }catch (error) {
      setLoading(false);
      if (error.message === 'Network request failed') 
        Alert.alert('Network Error', 'Failed to fetch data. Please check your network connection and try again.');
      console.error('Error checking data:', error);
    }
    
  }
  

  return (
    <KeyboardAvoidingView behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#752A26" />
      ) : (
      <View style={styles.main}>
      <Text style={styles.signup}>Sign Up</Text>
      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            style={styles.inputBox}
            value={value}
            onChangeText={onChange}
          />
        )}
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
      />
      {errors.email?.type === 'required' && <Text style={styles.textError}>Email is required</Text>}
      {errors.email?.type === 'pattern' && <Text style={styles.textError}>Enter valid email</Text>}

      <Controller
        name='password'
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            style={styles.inputBox}
            value={value}
            secureTextEntry
            onChangeText={(text) => {
              onChange(text);
              setPassword(text);
            }}
          />
        )}
        rules={{ required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ }}
      />
      {errors.password?.type === 'required' && <Text style={styles.textError}>Password is required</Text>}
      {errors.password?.type === 'minLength' && <Text style={styles.textError}>Password must be 8 characters long</Text>}
      {errors.password?.type === 'pattern' && <Text style={styles.textError}>Password must contain at least a uppercase,lowercase, number and a special character</Text>}

      <Controller
        name='confirmPassword'
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirm Password"
            style={styles.inputBox}
            value={value}
            secureTextEntry
            onChangeText={onChange}
          />
        )}
        rules={{ required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, validate: value => value === password || 'Passwords do not match' }}
      />
      {errors.confirmPassword?.type === 'required' && <Text style={styles.textError}>Password is required</Text>}
      {errors.confirmPassword?.type === 'minLength' && <Text style={styles.textError}>Password must be 8 characters long</Text>}
      {errors.confirmPassword?.type === 'pattern' && <Text style={styles.textError}>Password must contain at least a uppercase,lowercase, number and a special character</Text>}
      {errors.confirmPassword?.type === 'validate' && <Text style={styles.textError}>Passwords do not match</Text>}


      <TouchableOpacity onPress={handleSubmit(handleRegForm)} style={styles.register}>
        <Text style={styles.registerTitle}>Register</Text>
      </TouchableOpacity>
      <View style={styles.redirect}>
      <Text style={{ fontWeight: "bold",marginEnd:8 }}>You already have account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: "blue", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
      </View>
      </View>
      )}
    </KeyboardAvoidingView>
  )

}

export default Register

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    backgroundColor: '#C19F83',
    flex:1
},
main:{
  padding: 16,
  justifyContent: 'center',
  backgroundColor:'white',
  alignItems: 'center',
  marginStart:10,
  marginEnd:10,
  borderRadius: 20,
  ...Platform.select({
    ios:{
        shadowOffset: { width:2, height: 2},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    android:{
        elevation:8,
    }
})
},
redirect:{
  flexDirection:'row',
},
inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
},
register: {
    width: '90%',
    backgroundColor: '#752A26',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
},
registerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
},
signup: {
    fontSize: 30,
    color: '#752A26',
    fontWeight: '600',
    marginBottom: 30,
},
textError:{
    color: 'red',  
    fontSize: 12 
},
});