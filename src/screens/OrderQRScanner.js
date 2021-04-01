import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import {postOrderInfo} from '../service/orderService';
import helpers from '../helperFunctions/helpers';


export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [location, setLocation] = useState('none');
  const [message, setMessage ] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true, console.log("q, ", scanned));
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    test(data);
    

  };

  const test = (data) => {
    console.log(data);
    //var parsed_data = JSON.parse(data);
    //postOrderInfo(parsed_data.num, location, message);
    try {
      var parsed_data = JSON.parse(data);
      if("type" in parsed_data) {
        //  takes the qr code data and does things if the type is order vs if its product
        //  qrcode_type[parsed_data.type](parsed_data, navigation);
        //new code dont use if like old way
        if (parsed_data.type == "order") {
          if(location == 'none' && message == "") {
            alert('Please Choose Location and/or Leave a Message and try again')
          }
          else {
            try {
             console.log("hello?")
             helpers.getToken().then(token => {
               console.log(token)
               postOrderInfo(parsed_data.num, location, message, token)
             });
              alert(`Success! Order ${parsed_data.num} has been updated with location ${location} and message ${message}!`);
           }
            catch {
              alert('Failed to update order')
            }
          }
        }
        else if (parsed_data.type == "product") {
          alert('Wrong QR scanner, redirecting to the correct one');
        }
        else {
          alert('Invalid QR Code - j')
        }
      } 
    }
    catch {
      alert('Invalid QR Code');
    }


  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
        <Button 
        title={'Tap to Scan'} 
        onPress={() => setScanned(false)} 
        />
      </View>  
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.cameraScanner}
       // style={StyleSheet.absoluteFillObject}
      />   

    </View>
  );
}

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

  cameraScanner: {
    flex: 0,
    borderColor: 'gray',
    borderWidth: 200,
    margin: 10,
    borderRadius: 5,
    padding: 5,
},

heading: {
  width: '100%',
  backgroundColor: '#0094FF',
  paddingHorizontal: 10,
  paddingVertical: 2,
  marginBottom: 6,
  marginTop: 15,
  color: 'white',
  fontSize: 20,
 },
});
