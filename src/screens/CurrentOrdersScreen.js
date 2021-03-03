import React from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CurrentOrdersList from '../components/Lists/CurrentOrdersList'




export function CurrentOrdersScreen({navigation}) {
  // Set the current orders variable
  //const [currentOrders, setCurrentOrders] = React.useState(null);

  // Mock the current orders for testing the UI
  const orders = [
    {
      id: '11111',
      orderNumber: '251154129',
      orderDate: '02/03/2021',
      trackingNumber: '12254656984232156',
      sender: 'Eric Walker',
      receiver: 'B Base',
      status: 'Shipped',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '22222',
      orderNumber: '6234487156',
      orderDate: '12/26/2020',
      trackingNumber: '12254656984232156',
      sender: 'Adam Miller',
      receiver: 'C Base',
      status: 'Out for Delivery',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '33333',
      orderNumber: '365481198',
      orderDate: '01/14/2021',
      trackingNumber: '12254656984232156',
      sender: 'Jenny Stephan',
      receiver: 'Base F',
      status: 'Shipped',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '44444',
      orderNumber: '233656656',
      orderDate: '06/18/2020',
      trackingNumber: '12254656984232156',
      sender: 'Brandon Tommy',
      receiver: 'B Base',
      status: 'Arriving Late',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '55555',
      orderNumber: '6234487156',
      orderDate: '12/26/2020',
      trackingNumber: '12254656984232156',
      sender: 'Emily William',
      receiver: 'C Base',
      status: 'Out for Delivery',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '66666',
      orderNumber: '365481198',
      orderDate: '01/14/2021',
      trackingNumber: '12254656984232156',
      sender: 'Joe Dillan',
      receiver: 'Base F',
      status: 'Shipped',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '77777',
      orderNumber: '251154129',
      orderDate: '02/03/2021',
      trackingNumber: '12254656984232156',
      sender: 'Jessica Surrano',
      receiver: 'B Base',
      status: 'Unknown',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '88888',
      orderNumber: '6234487156',
      orderDate: '12/26/2020',
      trackingNumber: '12254656984232156',
      sender: 'Joseph Bryant',
      receiver: 'C Base',
      status: 'Out for Delivery',
      expectedDelivery: '02/15/2021'
    },
    {
      id: '99999',
      orderNumber: '365481198',
      orderDate: '01/14/2021',
      trackingNumber: '12254656984232156',
      sender: 'Nancy Kate',
      receiver: 'Base F',
      status: 'Shipped',
      expectedDelivery: '02/15/2021'
    },
  ];

  //setCurrentOrders(orders);

  return (
    <View style={styles.container}>
      <CurrentOrdersList itemList={orders}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
});


