import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview'
import queryString from 'query-string'
import axios from 'axios'
import SlackLogin from 'react-native-slack-login'

export default class LoginScreen extends React.Component {
    state = {
        modalVisible: false
      }
    
      toggleModal(visible) {
        this.setState({modalVisible: visible})
      }
    

    render(){
        const clientId = '1364451180086.1366032718646'
        const redirectUrl = 'http://localhost:3000/slack/redirect'
        const scopes= [
          "channels:read",
          "groups:read",
          "mpim:read",
          "im:read",
          "users:read",
          "channels:write",
          "chat:write",
        ]
        return (
          <View style={styles.container}>
              <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => {
            console.log('Button Clicked')
            // this.props.navigation.navigate('Home')
            this.toggleModal(true)
            // this.slackLogin.show()
            }}>
          <Text style={styles.loginText}>Login With Slack</Text>
        </TouchableOpacity>
            <Text style={styles.logo}>Slack ChatBot</Text>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      },
      
    });