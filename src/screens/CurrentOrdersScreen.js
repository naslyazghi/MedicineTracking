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

  const orderExample = [
    { 
      id: '9125334514',
      path: '/home/inv1/inv12',
      user: 'Jason Smith',
      order_date: '2021-02-14T19:07:38.511',
      status: 'Arriving Late',
      expectedDelivery: '05-10-2021',
      trackingNumber: '64212466665451288',

      items: [
        {
          id: 1,
          quantity: 5,
          product: {
              identifiers: [
                  {key: 'Name', value: 'Aspirin'}
              ]
          },
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        },
        {
          id: 2,
          quantity: 3,
          product: {
            identifiers: [
              {key: 'Name', value: 'Bandage'},
              {key: 'NDC', value: '123-1245-23'}
            ]
          },
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        }
      ],
      
      log: [
        {
          date: '2021-02-14T20:09:22.235',
          message: 'order approved by mlc',
        },
        {
          date: '2021-02-17T09:23:21.934',
          message: 'order arrived at mlc',
        },
      ],
    },

    { 
      id: '13654886599',
      path: '/home/inv2/inv22',
      user: 'Adam Clark',
      order_date: '2021-02-14T19:07:38.511',
      status: 'Shipped',
      expectedDelivery: '03-05-2021',
      trackingNumber: '12254656984232156',
      items: [
        {
          id: 1,
          product: {
            identifiers: [
                {key: 'Name', value: 'Tylenol'}
            ]
          },
          quantity: 5,
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        },
        {
          id: 2,
          product: {
            identifiers: [
              {key: 'Name', value: 'Bandage'},
              {key: 'NDC', value: '123-1245-23'}
            ]
          },
          quantity: 3,
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        }
      ],
      log: [
        {
          date: '2021-02-14T20:09:22.235',
          message: 'Order approved by mlc',
        },
        {
          date: '2021-02-17T09:23:21.934',
          message: 'Order arrived at mlc',
        },
      ],
    }
  ]
  //setCurrentOrders(orders);

  return (
    <View style={styles.container}>
      <CurrentOrdersList itemList={orderExample}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
});


