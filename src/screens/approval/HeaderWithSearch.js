import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

const HeaderWithSearch = ({ search, setSearch }) => {
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={setSearch}
                value={search}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInput}
                inputStyle={styles.searchBarInputText}
                leftIconContainerStyle={styles.leftIconContainer}
                searchIcon={<Image source={require('../../assets/search.png')} style={styles.searchIcon} />}
                clearIcon={search ? (
                    <TouchableOpacity onPress={() => setSearch('')}>
                        <Image source={require("../../assets/cancel.png")} style={[styles.sortIcon, {width:20, height:20}]}/>
                    </TouchableOpacity>
                    
                ) : null}
                round
            />
            <TouchableOpacity >
            <Image source={require('../../assets/sort.png')} style={styles.sortIcon} />
            </TouchableOpacity>
            <TouchableOpacity >
            <Image source={require('../../assets/filter.png')} style={[styles.sortIcon, {width:30}]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    searchBarContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    searchBarInput: {
        backgroundColor: '#eaeaea',
        borderRadius: 10,
    },
    searchBarInputText: {
        paddingLeft: 10,
    },
    leftIconContainer: {
        paddingLeft: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    sortIcon: {
        width: 20,
        height: 40,
        marginLeft: 5,
        marginRight:5
    },
    filterIcon: {
        marginLeft: 5,
        marginRight:5
    }
})

export default HeaderWithSearch;