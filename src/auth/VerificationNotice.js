import React, { useEffect,useContext } from 'react';
import { View, Text, Button, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import {auth} from '../auth/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import UserContext from '../../context/UserContext';

const VerificationNotice = (props) => {
  const user = auth.currentUser;
    const {setUserEmail,setL1ID} = useContext(UserContext)
    useEffect(() => {
        const checkEmailVerification = async () => {
          if (user) {
            await user.reload();
            if (user.emailVerified) {
              setUserEmail(props.route.params.email)
              setL1ID(props.route.params.id)
              props.navigation.navigate('Home');
            }
          }
        };
    
        const interval = setInterval(() => {
          checkEmailVerification();
        }, 5000); // Check every 5 seconds
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, []);

  const handleResendVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user)
        Alert.alert('Verification email resent. Please check your inbox.');
      } catch (error) {
        if (error.message === 'Network request failed') 
          Alert.alert('Network Error', 'Failed to fetch data. Please check your network connection and try again.');
        if (error.code === 'auth/too-many-requests') {
          Alert.alert('Too many requests. Please try again later.');
        }
        else{
        console.error('Failed to resend verification email:', error);
        Alert.alert('Failed to resend verification email. Please try again.');
        }
      }
    } else {
      Alert.alert('No user is currently signed in.');
    }
}


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        A verification email has been sent to your email address. Please verify your email to proceed.
      </Text>
      <TouchableOpacity onPress={handleResendVerification} style={styles.register}>
        <Text style={styles.registerTitle}>RESEND VERIFICATION EMAIL</Text>
      </TouchableOpacity>
      <View style={styles.redirect}>
      <Text style={{ fontWeight: "bold",marginEnd:8 }}>You already have account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: "blue", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  redirect: {
    flexDirection: 'row',
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
});

export default VerificationNotice;
