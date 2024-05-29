import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ApprovalComponent = ({ navigation }) => {
    const openPending = () =>{
        navigation.navigate("VerifyDetails")
    }
  return (
    <TouchableOpacity style={styles.container} onPress={openPending}>
        <View style={styles.hold}>
            <View style={styles.inner}><Text style={styles.txt1}>Visitor Name</Text></View>
            <View style={styles.inner}><Text style={styles.txt1}>Vivek Kashyap</Text></View>
        </View>
        <View style={styles.hold}>
            <View style={styles.inner}><Text style={styles.txt}>Date of visit</Text></View>
            <View style={styles.inner}><Text style={styles.txt}>20-10-2025</Text></View>
        </View>
        <View style={styles.hold}>
            <View style={styles.inner}><Text style={styles.txt}>No. of visitor</Text></View>
            <View style={styles.inner}><Text style={styles.txt}>5</Text></View>
        </View>
    </TouchableOpacity>
  )
}

export default ApprovalComponent

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: 150,
        backgroundColor:"#C6C3C1",
        paddingTop: "10%",
        alignItems: "center",
        marginBottom: 10
    },
    hold:{
        flexDirection:"row"
    },
    inner:{
        width: "50%",
        paddingLeft: "5%"
    },
    txt1:{
        fontWeight: "bold",
        marginBottom: 5
    },
    txt:{
        
    }
})