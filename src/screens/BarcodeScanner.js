import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
        navigation.navigate(parsed_data.redirect);
    },
    "product": (parsed_data) => {
        //add functionality to update quantity of item at current base
        //check out or check in a product at the base
        alert(` ${parsed_data.redirect}`);
    }
}


export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data)
    parsed_data = JSON.parse(data);

    if("type" in parsed_data) {
        qrcode_type[parsed_data.type](parsed_data, navigation);
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
