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

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.logo}>
                        Send Message
                </Text>
                
                
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
