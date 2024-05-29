import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Invite from '../../src/screens/Invite';
import MyApprovals from '../../src/screens/MyApprovals';
import Profile from '../../src/screens/Profile';
import VisitorFills from '../../src/screens/VisitorFills';
import {StyleSheet, Text, View, Image} from 'react-native';
import FillByYourSelf from '../../src/screens/FillByYourSelf';

const Tab = createBottomTabNavigator();
const InviteStack = createStackNavigator();
const MyApprovalsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function InviteStackScreen() {
  return (
    <InviteStack.Navigator>
      <InviteStack.Screen
        name="InviteScreen"
        component={Invite}
        options={{headerShown: false}}
      />
      <InviteStack.Screen
        name="VisitorFills"
        component={VisitorFills}
        options={{headerShown: false}}
      />
      <InviteStack.Screen
        name="FillByYourSelf"
        component={FillByYourSelf}
        options={{headerShown: false}}
      />
    </InviteStack.Navigator>
  );
}

function MyApprovalsStackScreen() {
  return (
    <MyApprovalsStack.Navigator>
      <MyApprovalsStack.Screen
        name="MyApprovalsScreen"
        component={MyApprovals}
        options={{headerShown: false}}
      />
    </MyApprovalsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#ece2e2',
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          marginTop: 10,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          fontFamily: 'Inter',
        },
      }}>
      <Tab.Screen
        name="Invite"
        component={InviteStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={
                  !focused
                    ? require('../../assets/icons/invitation.png')
                    : require('../../assets/icons/invitationDark.png')
                }
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#752a26' : 'black',
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color: focused ? '#752a26' : 'black',
                  fontSize: 12,
                  fontFamily: 'Inter',
                }}>
                INVITE
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyApprovals"
        component={MyApprovalsStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={
                  focused
                    ? require('../../assets/icons/approvedDark.png')
                    : require('../../assets/icons/approved.png')
                }
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#752a26' : 'black',
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color: focused ? '#752a26' : 'black',
                  fontSize: 12,
                  fontFamily: 'Inter',
                }}>
                APPROVALS
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ece2e2',
          },
          headerTintColor: '#752a26',
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Image
                source={
                  focused
                    ? require('../../assets/icons/userDark.png')
                    : require('../../assets/icons/user.png')
                }
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#752a26' : 'black',
                  bottom: 5,
                }}
              />
              <Text
                style={{
                  color: focused ? '#752a26' : 'black',
                  fontSize: focused ? 14 : 12,
                  fontFamily: 'Inter',
                }}>
                PROFILE
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
