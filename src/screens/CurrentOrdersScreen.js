import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CurrentOrdersList from '../components/Lists/CurrentOrdersList'
import {BASE_URL} from '../config';
import {getOrdersByPathRecursive} from '../service/orderService';
import helperFunctions from "../helperFunctions/helpers";




export function CurrentOrdersScreen({navigation}) {
  const [list, setList] = useState([]);
  const [token, setToken] = useState(global.userTokenConst,); 

  // This function makes sure to retrieve the needed data from the API before rendering the view
  useEffect(() => {
    let mounted = true;

    async function makeApiCalls() {
      let tokenResponse = await helperFunctions.getToken();
      setToken(tokenResponse);
      await getOrdersByPathRecursive("read", "order", "/home", token)
        .then(response => {
          if(mounted) {
            var list = response.Content;
            list.map(order => { 
              order.user = order?.user?.name; 
              return order 
          })
            setList(response.Content)
          }
        })
    }

    makeApiCalls()
    return () => mounted = false;
  }, [])

  console.log("list = " + JSON.stringify(list));

  // const orderExample = [
  //   { 
  //     id: '9125334514',
  //     path: '/home/inv1/inv12',
  //     user: 'Jason Smith',
  //     order_date: '2021-02-14T19:07:38.511',
  //     status: 'Arriving Late',
  //     expectedDelivery: '05-10-2021',
  //     trackingNumber: '64212466665451288',

  //     items: [
  //       {
  //         id: 1,
  //         quantity: 5,
  //         product: {
  //             identifiers: [
  //                 {key: 'Name', value: 'Aspirin'}
  //             ]
  //         },
  //         desired: {
  //           identifiers: [
  //             {key: 'Name', value: 'Salve'}
  //           ]
  //         }
  //       },
  //       {
  //         id: 2,
  //         quantity: 3,
  //         product: {
  //           identifiers: [
  //             {key: 'Name', value: 'Bandage'},
  //             {key: 'NDC', value: '123-1245-23'}
  //           ]
  //         },
  //         desired: {
  //           identifiers: [
  //             {key: 'Name', value: 'Salve'}
  //           ]
  //         }
  //       }
  //     ],
      
  //     log: [
  //       {
  //         date: '2021-02-14T20:09:22.235',
  //         message: 'order approved by mlc',
  //       },
  //       {
  //         date: '2021-02-17T09:23:21.934',
  //         message: 'order arrived at mlc',
  //       },
  //     ],
  //   },

  //   { 
  //     id: '13654886599',
  //     path: '/home/inv2/inv22',
  //     user: 'Adam Clark',
  //     order_date: '2021-02-14T19:07:38.511',
  //     status: 'Shipped',
  //     expectedDelivery: '03-05-2021',
  //     trackingNumber: '12254656984232156',
  //     items: [
  //       {
  //         id: 1,
  //         product: {
  //           identifiers: [
  //               {key: 'Name', value: 'Tylenol'}
  //           ]
  //         },
  //         quantity: 5,
  //         desired: {
  //           identifiers: [
  //             {key: 'Name', value: 'Salve'}
  //           ]
  //         }
  //       },
  //       {
  //         id: 2,
  //         product: {
  //           identifiers: [
  //             {key: 'Name', value: 'Bandage'},
  //             {key: 'NDC', value: '123-1245-23'}
  //           ]
  //         },
  //         quantity: 3,
  //         desired: {
  //           identifiers: [
  //             {key: 'Name', value: 'Salve'}
  //           ]
  //         }
  //       }
  //     ],
  //     log: [
  //       {
  //         date: '2021-02-14T20:09:22.235',
  //         message: 'Order approved by mlc',
  //       },
  //       {
  //         date: '2021-02-17T09:23:21.934',
  //         message: 'Order arrived at mlc',
  //       },
  //     ],
  //   }
  // ]
  //setCurrentOrders(orders);

  return (
    <View style={styles.container}>
      <CurrentOrdersList itemList={list}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
});


