import React, { Component } from 'react';
import { AppRegistry, ScrollView, View, TextInput, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import jwt_decode from "jwt-decode";
import functions from "../helperFunctions/helpers";
import AsyncStorage from '@react-native-community/async-storage'
const BASE_URL = 'http://10.0.0.5:8080/';

class NewOrderScreen extends Component {
  action = "create";
  resource = "order";
  refreshToken = global.refreshTokenConst;
  state = {
    token: global.userTokenConst,
    pathList: [], 
    selectedPath: '',
    isDesiredOrderSectionVisible: false,
    headingIcon: "plus-square",
    paths: [],
    orderNumber: "",
  };

  async componentDidMount () {
    this.setState({token: await functions.getToken()})
    this.setState({pathList: await this.getPathList()}) 
    this.processPathList();
  }


  //Get the full list of Paths
  async processPathList () {
    // console.log("Get complete path list function called ...");
    if (this.state.pathList !== null)
    {
      var val = this.state.pathList.map((value, index) => {
        // console.log('value: ' + value + " / index: " + index);
        return <Picker.Item label={value} value={value} key={index} />;
      });
      this.setState({paths: val});
      // console.log('selected path: ' + this.state.selectedPath);
    }
  }


  async getPathList () {
    const response = await fetch(BASE_URL + 'api/inventory/complete_paths', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        action: this.action,
        resource: this.resource,
      }),
    });
    // console.log(response);
    // 2 - Parsing the response
    var res = JSON.parse(await response.text());
    if (!res.response) 
    {
      Alert.alert('Error', res.message, [
        {text: 'OK'},
      ]);
      return null;
    }
    else 
    {
      return res.Content;
    }
  }


  // Check for the token if expired
  // async getToken () {
  //   // console.log("Get token function called ...");
  //   var isTokenExpired = functions.checkTokenIfExpired();
  //   // console.log("isTokenExpired = " + JSON.stringify(isTokenExpired));
  //   if(isTokenExpired)
  //   {
  //     // console.log("Token is expired")
  //     var newToken = functions.refreshToken();
  //     this.setState({token: newToken});
  //     return newToken;
  //   }
  //   else
  //   {
  //     // console.log("Token is not expired")
  //     return global.userTokenConst;
  //   }
  // }


  orderNumberTextInputChange (val) {
    this.setState({orderNumber: val});
    console.log("orderNumber = " + this.state.orderNumber);
  };


  showDesiredOrderSection() {
    setIsDesiredOrderSectionVisible(!this.state.isDesiredOrderSectionVisible)
    if (this.state.headingIcon == "plus-square")
    {
      this.setState({headingIcon : "minus-square"});
    }
    else
    {
      this.setState({headingIcon : "plus-square"});
    }
  };


  async placeOrder(orderNumber, selectedPath) {
    const response = await fetch(BASE_URL + 'api/order', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        orderNumber: orderNumber,
        path: selectedPath,
        items: [
        ]
      }),
    });
    // console.log(response);
    // 2 - Parsing the response
    var res = JSON.parse(await response.text());
    if (!res.response) 
    {
      Alert.alert('Error', res.message, [
        {text: 'OK'},
      ]);
      return null;
    }
    else 
    {
      Alert.alert('Success', res.message, [
        {text: 'OK'},
      ]);
      return res.Content;
    }
  }



  orderExample = [
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
  ];


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.heading}>Add order info*</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              placeholder={'Order Number'}
              placeholderTextColor={'#868686'}
              onChangeText={val => this.orderNumberTextInputChange(val)}
            />
          </View>
          {/* <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              placeholder={'Tracking Number'}
              placeholderTextColor={'#868686'}
              // onChangeText={val => invitationCodeInputChange(val)}
              // onEndEditing={e => handleValidInvitationCode(e.nativeEvent.text)}
            />
          </View> */}
          {/* <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              placeholder={'Order Date'}
              type={"date"}
              placeholderTextColor={'#868686'}
              // onChangeText={val => invitationCodeInputChange(val)}
              // onEndEditing={e => handleValidInvitationCode(e.nativeEvent.text)}
            />
          </View> */}
        
          <Text style={styles.heading}>Select order path*</Text>
        
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.selectedPath}
              style={{height: 40, width: 300,}}
              onValueChange={value => this.setState({selectedPath: value})}>
              {this.state.paths}
            </Picker>
          </View>

          <TouchableOpacity style={styles.desiredOrder} onPress={() => {
              this.showDesiredOrderSection();
            }}>
            <Feather name={this.state.headingIcon} style={styles.iconButton} />
            <Text style={{fontSize:18, color:'white'}}>Add desired order</Text>
          </TouchableOpacity>

          <View style={{width:'100%'}}>
            {
              this.state.isDesiredOrderSectionVisible == true ? 
                <View>
                  <Text style={styles.productHeading}>Product 1</Text>
                  <Text style={{marginLeft:18}}>Product 1 Details</Text>
                  <Text style={styles.productHeading}>Product 2</Text>
                  <Text style={{marginLeft:18}}>Product 2 Details</Text>
                  <Text style={styles.productHeading}>Product 3</Text>
                  <Text style={{marginLeft:18}}>Product 3 Details</Text>
                </View> 
                :
                null
            }
          </View>

          <FilledButton
            title={'Submit'}
            style={styles.submitButton}
            onPress={() => {
              this.placeOrder(this.state.orderNumber, this.state.selectedPath);
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

  textInput: {
    fontSize: 16,
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#000000',
  },

  heading: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 2,
    backgroundColor: '#74848f',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
    // textAlign: 'center',
  },

  desiredOrder: {
    marginTop: 120,
    fontSize: 19,
    marginBottom: 2,
    backgroundColor: '#74848f',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  productHeading: {
    backgroundColor: '#54b8ff',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 5,
    marginTop: 6,
    marginHorizontal: 8,
    color: 'white',
    fontSize: 17,
},

  iconButton: {
    color: "white", 
    fontSize: 22,
    paddingRight: 6,
},

  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#868686',
    backgroundColor: '#FFFFFF',
  },

  picker: {
    marginTop: 0,
    marginBottom: 40,
  },

  submitButton: {
    marginTop: 25,
},
});


AppRegistry.registerComponent('NewOrderScreen', () => NewOrderScreen);
module.exports = NewOrderScreen;

