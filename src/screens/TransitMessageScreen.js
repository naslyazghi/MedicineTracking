import React from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {FilledButton} from '../components/FilledButton';

//want to use this to prompt user to add message on where their package is in transit

export function TransitMessageScreen({route, navigation}) {
    const {order_num} = route.params;
    console.log(order_num);

    return (
      <View style={styles.container}>
      <Text style={styles.heading}>Add Info for QR Code</Text>

        <View style={{ marginLeft: 80, marginRight: 80 }}>

          <DropDownPicker
              items={[
                  {label: 'Order in Transit', value: 'order'},
                  {label: 'Product at Base', value: 'product'}
              ]}
              containerStyle={{width:40, height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
             // onChangeItem={item => this.setState({
             //     type: item.value,
             // })}
          />
        </View>

        <FilledButton
          title={'Submit'}
          style={styles.loginButton}
          //onPress={() => {

          //}}
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
