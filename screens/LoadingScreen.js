import React, { Component } from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'

export class LoadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default LoadingScreen