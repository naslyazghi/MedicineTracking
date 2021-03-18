'use strict';
 
import React, { Component } from 'react'
import {ScrollView, Text} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput, 
    Share
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';




class QRScreen extends Component {
  svg;
  state = {
    type: 'order',
    num: '', 
    qrData: ""
  };
  



  componentDidMount () {
    this.getDataURL(); // => Calling this in here to make sure the QRCode component did mount
  }

  print = () => {
    Print.printAsync({
      html: `
         <img src="data:image/jpeg;base64,${this.state.qrData}"/>
       `
    });
  }
 
  getDataURL() {
    this.svg.toDataURL(this.callback);
  }
  
  callback = (dataURL) => {
    this.setState({qrData: dataURL});
  }
  ///!!!!!
  ///!!!!
                    ///FIND A WAY TO UPDATE THIS!!!!!
////!!!!!
////!!!!!!
  value = {
    type: this.state.type,
    num: this.state.num
  }


  render() {

    return (
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.heading}>Add Info for QR Code</Text>

        <View style={styles.action}>

          <DropDownPicker
              items={[
                  {label: 'Order in Transit', value: 'order'},
                  {label: 'Product at Base', value: 'product'}
              ]}
              defaultValue={this.state.type}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.setState({
                  type: item.value,
              })}
          />
          <TextInput
            style={styles.input}
            placeholder = "Insert Order Number or Product NDC"
            onChangeText={(num) => this.setState({num: num})}
            value={this.state.num}
          />
        </View>

        <Text style={styles.heading}>Generated QR Code</Text>
        <QRCode
        //need to put in herwe this.state.type and this.state.num
          value={JSON.stringify(this.value)}
          size={200}
          bgColor='#000000'
          fgColor='#FFFFFF'
          getRef={(c) => (this.svg = c)}
        />
        <FilledButton
          title={'Print'}
          style={styles.loginButton}
          onPress={() => {
             this.print();
          }}
        />
      </View>
      </ScrollView>
    );
  };
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
 
AppRegistry.registerComponent('QRScreen', () => QRScreen);
 
module.exports = QRScreen;