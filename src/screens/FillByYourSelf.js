import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import DocumentPicker from 'react-native-document-picker';
import Phone from '../components/PhoneNumber';
import {ScrollView} from 'react-native-gesture-handler';

const FillByYourSelf = () => {
  const [prefix, setPrefix] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD',
  );
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [startedDate, setStartedDate] = useState('12/12/2023');

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSelectPhoto = async () => {
    try {
      const img = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      setSelectedPhoto(img[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('you have cancelled', err);
      } else {
        console.log(err);
      }
    }
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim()) {
      return false;
    }
    return true;
  };
  const RadioButton = ({onPress, selected, children}) => {
    return (
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.radioButton}>
          {selected ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.radioButtonText}>{children}</Text>
        </TouchableOpacity>
      </View>
    );
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
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const [isLiked, setIsLiked] = useState([
    {id: 1, value: true, name: 'Single', selected: false},
    {id: 2, value: false, name: 'Group', selected: false},
  ]);
  const onRadioBtnClick = item => {
    let updatedState = isLiked.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    setIsLiked(updatedState);
  };

  const [men, setMen] = useState('0');
  const [women, setWomen] = useState('0');
  const [boys, setBoys] = useState('0');
  const [girls, setGirls] = useState('0');

  return (
    <ScrollView style={styles.container}>
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

      <View>
        <View>
          <Text style={styles.label}>
            Date of Visit <Text style={styles.required}>*</Text>:
          </Text>
          <TouchableOpacity
            style={styles.inputBtn}
            onPress={handleOnPressStartDate}
            placeholder="yyyy-mm-dd">
            <Text>{selectedStartDate}</Text>
          </TouchableOpacity>
        </View>

        {/* Create modal for date picker */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openStartDatePicker}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                minimumDate={startDate}
                selected={startedDate}
                onDateChanged={handleChangeStartDate}
                onSelectedChange={date => setSelectedStartDate(date)}
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

              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{color: 'white'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Text style={{fontSize: 20, marginTop: 8, marginBottom: 8}}>
        Single or Group Visit:
      </Text>
      {isLiked.map(item => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          {item.name}
        </RadioButton>
      ))}
      <Text style={styles.label}>
        Phone Number <Text style={styles.required}>*</Text>:
      </Text>
      <Phone />
      <Text style={styles.label}>Photo:</Text>
      <TouchableOpacity
        style={selectedPhoto ? styles.selectedPhoto : styles.photoContainer}
        onPress={handleSelectPhoto}>
        {selectedPhoto ? (
          <Image source={{uri: selectedPhoto}} style={styles.photo} />
        ) : (
          <Text style={styles.uploadText}>Select Photo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Number of Men*</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={men}
        onChangeText={setMen}
      />

      <Text style={styles.label}>Number of Women*</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={women}
        onChangeText={setWomen}
      />
      <Text style={styles.label}>Number of Boys*</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={boys}
        onChangeText={setBoys}
      />
      <Text style={styles.label}>Number of Girls*</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={girls}
        onChangeText={setGirls}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c19f83',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  required: {
    color: 'red',
  },
  photoContainer: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 10,
    backgroundColor: '#c6c3c1',
    marginBottom: 10,
  },
  selectedPhoto: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 10,
    backgroundColor: '#c6c3c1',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#777777',
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#222',
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: 'center',
    marginTop: 14,
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
  error: {
    borderColor: 'red',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#752A26',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
});

export default FillByYourSelf;
