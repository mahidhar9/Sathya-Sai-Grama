import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {auth} from '../auth/firebaseConfig';
import {signInWithEmailAndPassword,sendEmailVerification} from 'firebase/auth'


const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm()

    const handleLoginForm = async(userCred) => {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth,userCred.email, userCred.password);
            const user = userCredential.user;
            setLoading(false);
            if (user.emailVerified) {
              // Email is verified, navigate to home
              console.log('User signed in and email verified');
              props.navigation.navigate('Home');
            } else {
              // Email is not verified, display message and send verification email (if needed)
              await sendEmailVerification(auth.currentUser);
              props.navigation.navigate('VerficationNotice');
            }
          } catch (error) {
            setLoading(false);
            if (error.message === 'Network request failed') 
                Alert.alert('Network Error', 'Failed to fetch data. Please check your network connection and try again.');
            if (error.code === 'auth/too-many-requests') {
                Alert.alert('Too many requests. Please try again later.');
              }
            else{
            console.error('Login Error:', error);
            // Handle login errors (e.g., invalid credentials)
            Alert.alert('Error', 'Login failed. Please check your email and password.');
            }
          }
        }
    
    return (
            <KeyboardAvoidingView behavior='padding'
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
                style={styles.container}>
                {loading ? (
                <ActivityIndicator size="large" color="#752A26" />
                ) : (
                <View style={styles.main}>
                <Text style={styles.login}>Login</Text>
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
                            onChangeText={onChange}
                        />
                    )}
                    rules={{ required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ }}
                />
                {errors.password?.type === 'required' && <Text style={styles.textError}>Password is required</Text>}
                {errors.password?.type === 'minLength' && <Text style={styles.textError}>Password must be 8 characters long</Text>}
                {errors.password?.type === 'pattern' && <Text style={styles.textError}>Password must contain at least a uppercase,lowercase, number and a special character</Text>}

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit(handleLoginForm)} style={styles.register}>
                    <Text style={styles.registerTitle}>Login</Text>
                </TouchableOpacity>
                <View style={styles.redirect}>
                <Text style={{ fontWeight: "bold",marginEnd:8 }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ color: "blue", fontWeight: "bold" }}>SignUp</Text>
                </TouchableOpacity>
                </View>
                </View>                
                )}
            </KeyboardAvoidingView>
    );
}

export default Login

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
        backgroundColor:'#752A26',
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
    login: {
        fontSize: 30,
        color: '#752A26',
        fontWeight: '600',
        marginBottom: 30,
    },
    textError:{
        color: 'red',  
        fontSize: 12 
    },
    forgotPassword:{
        color: '#2F3133',
        textAlign: 'right',
        width: "90%",
        fontSize: 15
    }
});