import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform
  } from 'react-native';
  import React from 'react';
  import { useForm, Controller } from 'react-hook-form';
  import {auth} from '../auth/firebaseConfig';
  import {sendPasswordResetEmail} from 'firebase/auth'

  const ForgotPassword = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
  
    const handleForgotPassword = async ({ email }) => {
      try {
        // Attempt to send password reset email
        await sendPasswordResetEmail(auth,email);        
        Alert.alert('Success', 'A password reset email has been sent (if the email exists).');  // Updated message
      } catch (error) {
        // Handle password reset errors
        console.error('Password Reset Error:', error);
        if (error.message === 'Network request failed') 
          Alert.alert('Network Error', 'Failed to fetch data. Please check your network connection and try again.');
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Info', 'The email address was not found. Please check your email or create a new account.');
        } else {
          // Handle other errors
          Alert.alert('Error', 'Password reset failed. Please try again.');
        }
      }
    };
  
  
    return (
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
        style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.forgot}>Forgot Password</Text>
          <Controller
            name='email'
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email for Password Reset"
                style={styles.inputBox}
                value={value}
                onChangeText={onChange}
              />
            )}
            rules={{ required: true, pattern: /^\S+@\S+$/i }}
          />
          {errors.email?.type === 'required' && <Text style={styles.textError}>Email is required</Text>}
          {errors.email?.type === 'pattern' && <Text style={styles.textError}>Enter a valid email</Text>}
          <Text style={styles.instructions}>Enter your email address to receive a password reset email (if the email exists).</Text>
          <TouchableOpacity onPress={handleSubmit(handleForgotPassword)} style={styles.register}>
            <Text style={styles.registerTitle}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.redirect}>
            <Text style={{ fontWeight: "bold", marginEnd: 8 }}>Want to go to</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default ForgotPassword;
  
  

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#C19F83',
        flex: 1
    },
    main: {
        padding: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowOffset: { width: 2, height: 2 },
                shadowColor: '#333',
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            }
        })
    },
    redirect: {
        flexDirection: 'row',
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
    textError: {
        color: 'red',
        fontSize: 12,
    },
    forgot: {
        fontSize: 30,
        color: '#752A26',
        fontWeight: '600',
        marginBottom: 30,
    },
    instructions: {
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    registerTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
});
