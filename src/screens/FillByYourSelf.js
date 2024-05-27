import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RadioGroup from 'react-native-radio-buttons-group';

const FillByYourSelf = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selected, setSelected] = useState('');
  const options = ['Male', 'Female'];
  const [photo, setPhoto] = useState(null);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setPhoto(image.path);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.error(error);
          Alert.alert('Error', 'An error occurred while picking the image.');
        }
      });
  };

  const handleSubmit = () => {
    const selectedGender = selected;
    if (!name || !phoneNumber || !selectedGender || !photo) {
      Alert.alert('All fields are required');
      return;
    }
    // Handle form submission
    console.log({name, phoneNumber, gender: selectedGender, photo});
  };

  const handleReset = () => {
    setName('');
    setPhoneNumber('');
    setSelected(selected);
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Visitor Details Form</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.label}>Select your gender:</Text>
        {options.map(option => {
          return (
            <TouchableOpacity
              key={option}
              style={styles.singleOptionContainer}
              onPress={() => setSelected(option)}>
              <View style={styles.outerCircle}>
                {selected === option ? (
                  <View style={styles.innerCircle} />
                ) : null}
              </View>
              <Text>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Photo</Text>
      </TouchableOpacity>
      {photo && <Image source={{uri: photo}} style={styles.photo} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c19f83',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#752a26',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  photo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#752a26',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  resetButton: {
    backgroundColor: '#752a26',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  questionContainer: {
    width: '90%',
  },
  singleOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    margin: 5,
  },
  outerCircle: {
    flexDirection: 'row',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    flexDirection: 'row',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#752a26',
  },
});

export default FillByYourSelf;
