import {Text, View, StyleSheet, TouchableOpacity, AsyncStorage, TextInput} from 'react-native'
import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select'
import { create } from 'axios'

let value = ''
export default class NewInstantMessage extends React.Component {
    state = {
        conversations: [],
        selectedValue : '',
        selectedConversation: '',
        channelId: '',
        message: 'test1',
        items: []
    }

    async componentDidMount(){
        try {
            value = await AsyncStorage.getItem('Token')
            console.log(value)
            // Parth's API
            fetch('http://9fda39342a36.ngrok.io/conversation-list', {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer '+value
                },
            })
            .then((response) =>  {
                return response.json();
            })
            .then((data) => {
                console.log('Getting conversations', data);
                this.setState({...this.state, conversations:data.data})
            })
            .catch(error => {
                console.log('Error occured while fetching conversation',error)
            });
            // renderConversations(value)
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.logo}>
                        Send Message
                </Text>
                <View style={{
                    borderRadius: 10,
                    marginTop: 50,
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                <RNPickerSelect 
                    placeholderTextColor="white"
                    style={pickerStyle}
                    onValueChange={(value) => {console.log(value)
                        this.setState({...this.state,channelId: value})
                    }}
                    items={this.state.conversations}
                />
                <TextInput style={{backgroundColor: 'white', marginTop: 30, borderRadius: 5, width: 300}} placeholder="Enter message" onChangeText={(e) =>{
                    console.log(e)
                    this.setState({...this.state,message:e})
                }}/>
                <Picker
                    selectedValue={this.state.selectedValue}
                    style={{ marginTop: 30,height: 50, width: 150, backgroundColor: 'white', width: 300}}
                    onValueChange={(itemValue, itemIndex) => this.setState({...this.state,selectedValue:itemValue})}
                >
                    <Picker.Item label="--Choose an option--" value="default" />
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Bot" value="bot" />
                </Picker>
                <TouchableOpacity 
                    style={styles.loginBtn}
                    onPress={() => {
                        console.log('Button Clicked')
                        this.sendMessage()
                }}>
                    <Text style={styles.loginText}>Send</Text>
                </TouchableOpacity>
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
        fontSize:50,
        color:"#fb5b5a",
        marginTop: 30
      },
      loginText:{
        color:"white",
        fontSize:15
      },
      loginBtn:{
        width:200,
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10,
        marginHorizontal: 50
      },
  });

  const pickerStyle = {
    inputIOS: {
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    placeholder: {
        color: 'black',
      },
    inputAndroid: {
        color: 'black',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
};