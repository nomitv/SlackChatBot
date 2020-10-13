import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, AsyncStorage, TextInput, Button, Platform} from 'react-native'
import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {create} from 'axios'

let value = ''
export default class ScheduleMessage extends React.Component {
    state = {
        conversations: [],
        selectedValue : '',
        selectedType : '',
        selectedConversation: '',
        channelId: '',
        message: 'test1',
        items: [],
        isDatePickerVisible: false,
        time: new Date(),
    }

    showDatePicker = () => {
        this.setState({...this.state,isDatePickerVisible:true});
      };
    
    hideDatePicker = () => {
        this.setState({...this.state,isDatePickerVisible:false});
      };
    
    handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        this.setState({...this.state, time:date})
        this.hideDatePicker();
      };

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
                        Schedule Message
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
                    style={{ marginTop: 30,height: 50, width: 150, backgroundColor: 'white', width: 300,}}
                    onValueChange={(itemValue, itemIndex) => this.setState({...this.state,selectedValue:itemValue})}
                >
                    <Picker.Item label="--Choose an option--" value="default" />
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Bot" value="bot" />
                </Picker>
                <Picker
                    selectedValue={this.state.selectedType}
                    style={{ marginTop: 30,height: 50, width: 150, backgroundColor: 'white', width: 300, marginBottom: 30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({...this.state,selectedType:itemValue})}
                >
                    <Picker.Item label="--Choose an option--" value="default" />
                    <Picker.Item label="Specific Date and Time" value="null" />
                    <Picker.Item label="Daily" value="daily" />
                    <Picker.Item label="Weekly" value="weekly" />
                    <Picker.Item label="Monthly" value="monthly" />
                </Picker>

                <Button title="Show Date Picker" onPress={this.showDatePicker} color={'#fb5b5a'} />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="datetime"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                />

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
              inputAndroid: {
                color: 'white',
                paddingHorizontal: 10,
                backgroundColor: 'red',
                borderRadius: 5,
            },
          });