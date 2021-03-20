import React, {useState} from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {FilledButton} from '../components/FilledButton';

//want to use this to prompt user to add message on where their package is in transit

//need to send data to server
//need to navigate off this screen after pressing submit button


export function TransitMessageScreen({route, navigation}) {
    const {order_num} = route.params;
    const [location, setLocation] = useState('order');
    const [message, setMessage ] = useState("");
    const [submit, setSubmit] = useState(false);
 
    function sub() {
      if (!submit) return;
      setSubmit(false);
      //SEND THIS INFO AS JSON TO DATABASE TO UPDATE ORDER_NUM
      console.log(location, message, submit, order_num);
     // navigation.navigate("CurrentOrderDetails");

    }


    return (
      <View style={styles.container}>
      <Text style={styles.heading}>Add Message to Order</Text>

        <View style={styles.action}>

          <DropDownPicker
              items={[
                  {label: 'Order at MLC', value: 'mlc'},
                  {label: 'Order in Transit', value: 'transit'},
                  {label: 'Order Ready for Pickup', value: 'pickup'}
              ]}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => {
                setLocation(item.value);
              }}
          />
          <TextInput
            style={styles.input}
            placeholder={'Add a Message for the recipient'}
            placeholderTextColor={'#868686'}
            onChangeText={(msg) => setMessage(msg)}
            value={message}
          />
        </View>  
        <FilledButton
          title={'Click'}
          style={styles.loginButton}
          onPress={() => {
            setSubmit(true, sub());
            // MAybe prompt scan another? update the default location to be the one they just chose?
            // dont know easiest way for them to mass scan..... maybe I can have these options on the same page as the qr code scanner?
           // navigation.navigate('CurrentOrderDetails')
          }}          
        />      
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
 
    input: {
        flex: 0,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },

    heading: {
      fontSize: 18,
      marginTop: 30,
      marginBottom: 5,
      backgroundColor: '#74848f',
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 4,
      color: 'white',
    }
});
