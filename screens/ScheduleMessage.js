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