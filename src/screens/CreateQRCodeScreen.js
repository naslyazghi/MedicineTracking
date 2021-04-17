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

//this is done
//unless we want to add qr code generation to ims or add more data into qr code

//mlc labels package after re-packaging

class QRScreen extends Component {
  svg;
  state = {
    type: 'order',
    num: '', 
    qrData: "",
    print: false,
  };
 
  componentDidMount () {
    this.getDataURL(); // => Calling this in here to make sure the QRCode component did mount
  }

  print = () => {
    if (!this.state.print) return
    this.setState({print: false})
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
    this.setState({qrData: dataURL}, this.print);
  }



  render() {

    return (
      <ScrollView>
      <View style={styles.container}>
      {/* <Text style={styles.heading}>Add Info for QR Code</Text> */}
        <View style={styles.action}>
{/* 
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
          /> */}
          <TextInput
            style={styles.textInput}
            placeholder = "Insert Order Number"
            onChangeText={(num) => this.setState({num: num})}
            value={this.state.num}
          />
        </View>
{/* 
        <Text style={styles.heading}>Generated QR Code</Text> */}
        <QRCode
          value = {JSON.stringify({type: this.state.type, num: this.state.num})}
          size={200}
          bgColor='#000000'
          fgColor='#FFFFFF'
          getRef= {(c) => {this.svg = c}}
        />
        <FilledButton
          title={'Print'}
          style={styles.loginButton}
          onPress={() => {
            this.setState({print: true})
            this.getDataURL();
          }}
        />
      </View>
      </ScrollView>
    );
  };
}
 
const styles = StyleSheet.create({
  
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    flexDirection: 'row',
    marginVertical: 30,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#868686',
    backgroundColor: '#FFFFFF',
  },

  textInput: {
    fontSize: 16,
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#000000',
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
// container: {
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
 
    input: {
        width:'100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 40,
        borderRadius: 5,
    },

//     heading: {
//       fontSize: 18,
//       marginTop: 5,
//       marginBottom: 5,
//       backgroundColor: '#74848f',
//       width: '100%',
//       paddingHorizontal: 10,
//       paddingVertical: 4,
//       color: 'white',
//     }
});

AppRegistry.registerComponent('QRScreen', () => QRScreen);

module.exports = QRScreen;