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