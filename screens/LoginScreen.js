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
    
      _storeData = (code) => {
        let new_code=code
  
        // Parth's API
        let data = {
          "token" : new_code
        }
        console.log('This is being sent',new_code)
        fetch('http://9fda39342a36.ngrok.io/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log('Getting data', data);
          AsyncStorage.setItem(
              'Token',
              data.data.token
            )
            .then(() => {
              console.log('Token Stored Successfully')
            })
            .catch(error => {
              console.log('Error Occured while storing token', error)
            })
        })
        .catch(error => {
          console.log(error)
        });
    };

    handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    if (url.includes(':3000')) {
      let params = queryString.parse(url)
      let code = params[Object.keys(params)[0]]
      console.log('Printing the code',code)
      this._storeData(code)
      this.toggleModal(false)
      this.props.navigation.navigate('Home')
    }  
  };

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
            <Modal
            transparent={true}
            animationType = {"fade"} 
            visible={this.state.modalVisible}
            onRequestClose = {() =>{ this.toggleModal(false) } }>
              <View style={{backgroundColor: "#000000aa", flex:1}}>
                <View style={{backgroundColor:"#fff", margin:20, borderRadius:10, flex:1}}>
                  <WebView source={{ uri: `https://slack.com/oauth/v2/authorize?user_scope=${encodeURIComponent(scopes)}&client_id=${clientId}"` }}
                    onNavigationStateChange={this.handleWebViewNavigationStateChange}
                  />
                </View>
              </View>
          </Modal>
              
            <Text style={styles.logo}>Slack ChatBot</Text>
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
      },loginText:{
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
        marginTop:40,
        marginBottom:10
      },
      modal: {
        justifyContent: 'center',  
        alignItems: 'center',   
      }
      
    });