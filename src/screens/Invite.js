import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { getAccessFromRefresh } from '../components/RefreshToken';





const Invite = ({navigation}) => {

  const {accessToken, setAccessToken} = useContext(UserContext);

  const setToken = () => {
    getAccessFromRefresh()
    .then((res) => {
      setAccessToken(res)
      console.log(accessToken)
    })
  }

  useEffect(()=>{
    setInterval(async() => {
      setToken();
    }, 300000)
  }, [])


  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>Welcome Username</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          faucibus pulvinar elementum integer enim neque volutpat ac tincidunt.
          Arcu bibendum at varius vel
        </Text>
      </View>
      <>
        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('VisitorFills')}>
          <Text style={styles.registerTitle}>Visitor Fills the Form</Text>
        </TouchableOpacity>
        <Text style={styles.smalltext}>
          Click the button above to fill the form by a visitor.
        </Text>

        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('FillByYourSelf')}>
          <Text style={styles.registerTitle}>Fill it by yourself</Text>
        </TouchableOpacity>
        <Text style={styles.smalltext}>
          Click the button above to complete the form on your own.
        </Text>
      </>
    </View>
  );
};

export default Invite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#c19f83',
  },
  welcome: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 8,
  },
  register: {
    width: '95%',
    backgroundColor: '#752A26',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  registerTitle: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  smalltext: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '900',
    paddingTop: 8,
    marginBottom: 20,
  },
});