import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

//add back button to this screen or add toolbar (currentorderdetailseditablescreeen for example)


const qrcode_type = {
    "order": (parsed_data, navigation) => {
        //Add functionality to update status
        //recieved by mlc, update status to packaging/ready to pickup/out for delivery
        //changes hands (order moves to new inventory), pass to sub-inventories 
        //at mlc -> out for delivery -> user
        //1) dropdown menu what you update status to and add message 
        ///// ex) order comes into mlc + is destoryed
        ///// ex) order is running late 
        ///// ex) order is being repackaged
        //or//
        //2) pass to a new inventory and message as such
            // ex) order was recieved at MLC
            // ex) order was switched to outgoing shipment inventory

        //add notifications for those ^^^^ (put into own folder.. use it here or use it in a different part of app)
       // navigation.navigate("TransitMessage", {parsed_data});
       
    },
    "product": (parsed_data) => {
        //add functionality to update quantity of item at current base
        //check out or check in a product at the base
        alert(` ${parsed_data.redirect}`);
    }
}


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
          alert(`Success! Order ${parsed_data.num} has been updated with location ${location} and message ${message}!`);
        }
        console.log(message);
        console.log("555", scanned)
      }
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
        <Button 
        title={'Tap to Scan'} 
        onPress={() => setScanned(false)} 
        />
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
