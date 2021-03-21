import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';


        //add functionality to update quantity of item at current base
        //check out or check in a product at the base



export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [checking, setChecking] = useState('none');
  const [quantity, setquantity ] = useState("");

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
    try {
      var parsed_data = JSON.parse(data);
      if("type" in parsed_data) {
        //  takes the qr code data and does things if the type is order vs if its product
        //  qrcode_type[parsed_data.type](parsed_data, navigation);
        //new code dont use if like old way
        if (parsed_data.type == "product") {
          if(Checking == 'none' && quantity == "") {
            alert('Please choose if checking in or out and how much you are taking/adding and try again')
          }
          else {
            alert(`Success! Order ${parsed_data.num} has been updated with Checking ${Checking} and quantity ${quantity}!`);
          }
        }
        else if (parsed_data.type == "order") {
          alert('Wrong QR scanner, redirecting to the correct one');
        }
        else {
          alert('Invalid QR Code')
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
      <Text style={styles.heading}>Check in/out medication</Text>
      <View style={styles.action}>

        <DropDownPicker
            items={[
                {label: 'Checking In', value: 'in'},
                {label: 'Checking Out', value: 'out'}
            ]}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => {
              setChecking(item.value);
            }}
        />
        <TextInput
          style={styles.input}
          placeholder={'Add quanity checking in/out of medication'}
          placeholderTextColor={'#868686'}
          onChangeText={(msg) => setquantity(msg)}
          value={quantity}
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
