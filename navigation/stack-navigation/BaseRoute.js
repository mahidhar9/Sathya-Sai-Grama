import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Login from '../../src/screens/Login';
import Register from '../../src/screens/Register';
import ForgotPassword from '../../src/screens/ForgotPassword';
import VerificationNotice from '../../src/auth/VerificationNotice';
import { AuthContext, AuthProvider } from '../../src/auth/AuthProvider';
import ApprovalTab from '../../src/screens/approval/ApprovalTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import FooterTab from '../tab-navigation/FooterTab';

const BaseRoute = () => {
  return (
        <AuthProvider>
          <Routes />
        </AuthProvider>
      );
}

const Routes = () => {
    const { user } = useContext(AuthContext);
    const Stack = createNativeStackNavigator();
  
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Footer" component={FooterTab} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Register} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="VerificationNotice" component={VerificationNotice} />
              <Stack.Screen name="ApprovalTab" component={ApprovalTab} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  

export default BaseRoute

const styles = StyleSheet.create({})