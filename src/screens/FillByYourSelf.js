import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const FillByYourSelf = () => {
  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD',
  );

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(false);

  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (validateForm()) {
      Alert.alert('Success', 'Form submitted successfully');
      // Add form submission logic here
    } else {
      Alert.alert('Error', 'Please fill in all mandatory fields');
    }
  };
  function hadleOnPress() {
    setOpen(!open);
  }
  function handleDateChange(propDate) {
    setDate(propDate);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Name <Text style={styles.required}>*</Text>:
      </Text>
      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            isSubmitted && !firstName.trim() ? styles.error : null,
          ]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
        <TextInput
          style={[
            styles.input,
            isSubmitted && !lastName.trim() ? styles.error : null,
          ]}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Date of Visit: </Text>
        <TouchableOpacity onPress={hadleOnPress} style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/calender.png')} // Use your icon image path
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              bottom: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calender"
              selected={date}
              minimumDate={startDate}
              onDateChange={handleDateChange}
              options={{
                backgroundColor: '#ffefd9',
                textHeaderColor: '#752A26',
                textDefaultColor: '#090C08',
                selectedTextColor: '#ffefd9',
                mainColor: '#752A26',
                textSecondaryColor: '#ecc565',
                borderColor: '#090C08',
              }}
            />

            <TouchableOpacity onPress={hadleOnPress}>
              <Text style={{color: '#ecc565'}}>Select Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <Button title="Submit" onPress={handleSubmit} color="#752A26" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c19f83',
  },
  buttonStyle: {
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    // marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c6c3c1',
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 5,
  },
  prefix: {
    borderWidth: 0.5,
    borderColor: '#c6c3c1',
    padding: 10,
    marginRight: 10,

    borderRadius: 5,
  },
  error: {
    borderColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    width: 0,
    height: 2,

    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffefd9',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 'auto',
  },
  iconText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#752A26',
  },
});

export default FillByYourSelf;
