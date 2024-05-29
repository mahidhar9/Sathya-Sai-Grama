import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ApprovalComponent from './ApprovalComponent'

const Pending = ({navigation}) => {
  return (
    <View>
      <ApprovalComponent navigation={navigation}/>
    </View>
  )
}

export default Pending

const styles = StyleSheet.create({})