import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native'

export default class HomeScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={{marginBottom: 150}}>
                    <Text style={styles.logo}>
                        Message Options
                    </Text>
                </View>
                <TouchableOpacity 
                    style={styles.loginBtn}
                    onPress={() => {
                    this.props.navigation.navigate('SendMessage')
                    }}>
                    <Text style={styles.loginText}>Send a Message</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.loginBtn}
                    onPress={() => {
                    console.log('Button Clicked')
                    this.props.navigation.navigate('ScheduleMessage')
                    }}>
                    <Text style={styles.loginText}>Schedule Message</Text>
                </TouchableOpacity>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      logo:{
        fontWeight:"bold",
        fontSize:40,
        color:"#fb5b5a",
        marginTop: 30
      }, 
      loginText:{
        color:"white",
        fontSize:15
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:50,
        marginBottom:10
      },
})