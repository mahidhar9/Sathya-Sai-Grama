import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Share} from 'react-native';
import CheckBox from 'react-native-check-box';

const HighlightedText = ({text, highlights}) => {
  const regex = new RegExp(`(${highlights.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text style={styles.headertext}>
      {parts.map((part, index) =>
        highlights.some(
          highlight => part.toLowerCase() === highlight.toLowerCase(),
        ) ? (
          <Text key={index} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
};

const VisitorFills = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = option => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `I am inviting you for ${selectedOption || 'an event'}.`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HighlightedText
          text="Are You inviting For Home or Office"
          highlights={['Home', 'Office']}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedOption === 'Home' && styles.selectedCheckbox,
          ]}
          onPress={() => handleCheckboxChange('Home')}>
          <CheckBox
            isChecked={selectedOption === 'Home'}
            onClick={() => handleCheckboxChange('Home')}
            checkBoxColor="#752A26"
          />
          <Text
            style={[
              styles.checkboxText,
              selectedOption === 'Home'
                ? styles.selectedCheckboxText
                : styles.unselectedCheckboxText,
            ]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.checkbox,
            selectedOption === 'Office' && styles.selectedCheckbox,
          ]}
          onPress={() => handleCheckboxChange('Office')}>
          <CheckBox
            isChecked={selectedOption === 'Office'}
            onClick={() => handleCheckboxChange('Office')}
            checkBoxColor="#752A26"
          />
          <Text
            style={[
              styles.checkboxText,
              selectedOption === 'Office'
                ? styles.selectedCheckboxText
                : styles.unselectedCheckboxText,
            ]}>
            Office
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Share URL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c19f83',
  },
  header: {
    paddingTop: 30,
    alignItems: 'center',
  },
  headertext: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  highlight: {
    color: '#752A26',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#c6c3c1',
  },
  selectedCheckbox: {
    borderColor: '#752A26',
    backgroundColor: '#F5E1E1',
  },
  checkboxText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  selectedCheckboxText: {
    color: '#752A26',
  },
  unselectedCheckboxText: {
    color: '#c6c3c1',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#752A26',
  },
  shareButtonText: {
    color: '#F5E1E1',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default VisitorFills;