import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}></Text>
      <PhoneInput
        defaultValue={phoneNumber}
        defaultCode="IN"
        withShadow
        containerStyle={styles.phoneInputContainer}
        textContainerStyle={styles.textContainer}
        flagButtonStyle={styles.flagButton}
        codeTextStyle={styles.codeText}
        onChangeFormattedText={text => {
          setFormattedValue(text);
          setPhoneNumber(text);
        }}
      />
    </SafeAreaView>
  );
};

export default Phone;

const styles = StyleSheet.create({
  phoneInputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingVertical: 0,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  flagButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginLeft: 10,
  },
  codeText: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 1,
  },
  phoneButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
