import React, { useState, useEffect } from 'react';
import {Alert, View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CurrentOrdersList from '../components/Lists/CurrentOrdersList'
import {BASE_URL} from '../config';
import {getOrdersByPathRecursive} from '../service/orderService';
import helperFunctions from "../helperFunctions/helpers";



export function CurrentOrdersScreen({navigation}) {
  const [list, setList] = useState([]);

  //This function makes sure to retrieve the needed data from the API before rendering the view
  useEffect(() => {
    let mounted = true;
    const refreshList = navigation.addListener('focus', () => {
      makeApiCalls();
    });
    
    
    async function makeApiCalls() {
      var token = await helperFunctions.getToken().then(data => data);
      console.log("{CurrentOrdersScreen} => Token = " + JSON.stringify(token));
      await getOrdersByPathRecursive("read", "order", "/home", token)
      .then(response => {
        if(mounted) {
          var list = response.Content;
          list.map(order => {
            order.user = order?.user?.name;
            return order
          })
          setList(list)
          console.log("{CurrentOrdersScreen} => Refreshed the list");
          }
        })
    }

    makeApiCalls();
    return () => mounted = false;
    return refreshList;
  }, [])






  // console.log("list = " + JSON.stringify(list));+




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


