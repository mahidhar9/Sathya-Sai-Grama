import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';

const MyApprovals = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>MyApprovals</Text>
      <Button title="Click Here" onPress={() => alert('button Clicked')} />
    </View>
  );
};

export default MyApprovals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c19f83',
  },
});
