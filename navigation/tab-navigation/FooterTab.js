import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Invite from '../../src/screens/Invite';

import { StyleSheet, Text, View, Image } from 'react-native';
import ApprovalTab from '../../src/screens/approval/ApprovalTab';
import Profile from '../../src/screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VisitorFills from '../../src/screens/VisitorFills';
import FillByYourSelf from '../../src/screens/FillByYourSelf';


const Tab = createBottomTabNavigator();


const InviteStack = createNativeStackNavigator();

function InviteStackScreen() {
  return (
    <InviteStack.Navigator screenOptions={{ headerShown: false }}>
    <InviteStack.Screen name="Invite" component={Invite} />
      <InviteStack.Screen
        name="VisitorFills"
        component={VisitorFills} 
      />
      <InviteStack.Screen
        name="FillByYourSelf"
        component={FillByYourSelf}
      />
    </InviteStack.Navigator>
  );
}




function FooterTab({navigation}) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: '#ece2e2',
                    height: 70,
                    borderTopWidth: 0,
                    elevation: 0,
                    paddingTop: 8,
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25,
                    fontFamily: 'Inter',
                },
            }}>
            <Tab.Screen
                name="InviteStackScreen"
                component={InviteStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={
                                    !focused
                                        ? require('../../src/assets/invitation.png')

                                        : require('../../src/assets/invitationDark.png')
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
                name="ApprovalTab"
                component={ApprovalTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={
                                    focused
                                        ? require('../../src/assets/approvedDark.png')
                                        : require('../../src/assets/approved.png')
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
                component={Profile}
                options={{
                    headerShown: false,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ece2e2',
                    },
                    headerTintColor: '#752a26',
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={
                                    focused
                                        ? require('../../src/assets/userDark.png')
                                        : require('../../src/assets/user.png')
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
export default FooterTab;
const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});