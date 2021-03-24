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
import Moment from 'moment';
import { upperCaseFirst } from "upper-case-first";
import Dialog from "react-native-dialog";
import {BASE_URL} from '../config';

class NewOrderScreen extends Component {
  action = "create";
  resource = "order";
  refreshToken = global.refreshTokenConst;
    
  state = {
    token: global.userTokenConst,
    pathList: [], 
    selectedPath: "",
    isDesiredOrderSectionVisible: false,
    headingIcon: "plus-square",
    paths: [],
    orderNumber: "0",
    identifiers: [],
    isAddNewProductDialogVisible: false,
    isAddNewIdentifierDialogVisible: false,
    productName: "",
    productQuantity: 0,
    identifierKey: "",
    identifierValue: "",
  };
  
  order = {
    orderNumber: "",
    path: "",
    items: [
    ]
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
    console.log("Path response = " + JSON.stringify(response));
    // 2 - Parsing the response
    var res = JSON.parse(await response.text());
    if (!res.response) 
    {
      console.log("Path response message = " + JSON.stringify(res.response));
      Alert.alert('Error', res.message, [
        {text: 'OK'},
      ]);
      return null;
    }
    else 
    {
      console.log("Path response message = " + JSON.stringify(res.response));
      console.log("Path response content = " + JSON.stringify(res.Content));
      return res.Content;
    }
  }


  orderNumberTextInputChange (val) {
    this.setState({orderNumber: val});
    console.log("orderNumber = " + this.state.orderNumber);
  }


  showDesiredOrderSection() {
    this.setState({isDesiredOrderSectionVisible: !this.state.isDesiredOrderSectionVisible})
    // setIsDesiredOrderSectionVisible(!this.state.isDesiredOrderSectionVisible)
    if (this.state.headingIcon == "plus-square")
    {
      this.setState({headingIcon : "minus-square"});
    }
    else
    {
      this.setState({headingIcon : "plus-square"});
    }
  }

  showAddNewProductDialog () {
    console.log("show add new product dialog");
    // setIsAddNewProductDialogVisible(true);
    this.setState({isAddNewProductDialogVisible: true});
  }

  showAddNewIdentifierDialog (identifier) {
    console.log("here");
    // setIdentifiers(identifier);
    // setIsAddNewIdentifierDialogVisible(true);
    this.setState({identifiers : identifier});
    this.setState({isAddNewIdentifierDialogVisible : true});
  }

  handleCancel () {
    // setIsAddNewProductDialogVisible(false);
    // setIsAddNewIdentifierDialogVisible(false);
    this.setState({isAddNewProductDialogVisible : false});
    this.setState({isAddNewIdentifierDialogVisible : false});
  }

  newProductNameInputChange (val) {
    // setProductName(val);
    this.setState({productName : val});
  }

  newProductQuantityInputChange (val) {
    // setProductQuantity(val);
    this.setState({productQuantity : val});
  }

  newIdentifierKeyInputChange (val) {
    // setIdentifierKey(val);
    this.setState({identifierKey : val});
  }

  newIdentifierValueInputChange (val) {
    // setIdentifierValue(val);
    this.setState({identifierValue : val});
  }

  handleAddProduct () {
    var productIdentifier = {"key":"name", "value":this.state.productName}
    console.log("product identifier = " + JSON.stringify(productIdentifier));
    var newProduct = {
      // id: Math.floor(Math.random() * 100) + 1,
      "product": {},
      "quantity": this.state.productQuantity,
      "desired": {"identifiers":[productIdentifier]},
    }
    console.log("new product = " + JSON.stringify(newProduct));
    this.order.items.push(newProduct);
    console.log("Order = " + JSON.stringify(this.order));
    this.setState({isAddNewProductDialogVisible: false})
    // setIsAddNewProductDialogVisible(false);
  }

  handleAddIdentifier () {
    var productIdentifier = {"key":this.state.identifierKey, "value":this.state.identifierValue}
    console.log("identifiers:" + JSON.stringify(this.state.identifiers));
    this.state.identifiers.push(productIdentifier);
    this.setState({isAddNewIdentifierDialogVisible: false});
  }


  clearOrder() {
    this.setState({orderNumber: 0});
    this.setState({selectedPath: ""});
    this.order.orderNumber = "";
    this.order.path = "";
    this.order.items = [];
  }



  async placeOrder(orderNumber, selectedPath) {
    this.order.path = selectedPath;
    this.order.orderNumber = orderNumber;
    console.log("Order = " + JSON.stringify(this.order))
    const response = await fetch(BASE_URL + 'api/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`,
      },
      body: JSON.stringify(this.order),
    });
    // console.log(response);
    // 2 - Parsing the response
    var res = JSON.parse(await response.text());
    if (!res.response) 
    {
      Alert.alert('Error', res.message, [
        {text: 'OK'},
      ]);
    }
    else 
    {
      Alert.alert('Success', 
        (res.message + "\n" + "Order Id: " + res.Content._id), 
        [{text: 'OK'},]
      );
      this.clearOrder();
    }
  }


  callback(){
    const thisClass = this;
    return (item, i) => {
        return <View style={styles.listItemValue} key={i}>
          {/* <Text style={styles.productHeading}>{"Product " + (i+1)}</Text> */}
          <Text style={styles.productHeading}>{"Product " + (i+1)}</Text>
          <View>
              {item.desired.identifiers.map((prod, j) => (
                  <View >
                      <Text style={styles.listItemKey} key={j}>
                          {prod.key + ": "} 
                          <Text style={styles.listItemValue}>{prod.value}</Text>
                      </Text>
                  </View>
              ))}
          </View>
          <Text style={styles.listItemKey}>{"Quantity: " + item.quantity}</Text>
          {/* Add a new identifier */}
          <TouchableOpacity onPress={() => {thisClass.showAddNewIdentifierDialog(item.desired.identifiers)}}>
              <Text style={styles.addNewIdentifierButton}>Add identifier</Text>
          </TouchableOpacity>
        </View>
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
                  {/* <Text style={styles.productHeading}>Product 1</Text>
                  <Text style={{marginLeft:18}}>Product 1 Details</Text>
                  <Text style={styles.productHeading}>Product 2</Text>
                  <Text style={{marginLeft:18}}>Product 2 Details</Text>
                  <Text style={styles.productHeading}>Product 3</Text>
                  <Text style={{marginLeft:18}}>Product 3 Details</Text> */}

                  <Text style={styles.orderDetailsHeading}>Products</Text>
                  {this.order.items.map(this.callback())}

                  {/* Pop up dialog to add new identifier */}
                  <Dialog.Container visible={this.state.isAddNewIdentifierDialogVisible}>
                    <Dialog.Title>Add Identifier</Dialog.Title>
                    <Dialog.Description>
                        Add an identifier for the product
                    </Dialog.Description>
                    <Dialog.Input placeholder={'key'} onChangeText={val => this.newIdentifierKeyInputChange(val)}/>
                    <Dialog.Input placeholder={'Value'} onChangeText={val => this.newIdentifierValueInputChange(val)}/>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Add" onPress={() => {
                        this.handleAddIdentifier()}}
                    />
                  </Dialog.Container>

                  {/* Add a new product */}
                  <TouchableOpacity style={styles.newProductsButton} onPress={() => {this.showAddNewProductDialog()}}>
                    <Feather name={"plus-square"} style={styles.iconButton} />
                    <Text style={{fontSize:17, color:'white'}}>Add Product</Text>
                  </TouchableOpacity>
                  {/* Pop up dialog to add new product */}
                  <Dialog.Container visible={this.state.isAddNewProductDialogVisible}>
                    <Dialog.Title>Add Product</Dialog.Title>
                    <Dialog.Description>
                        Add the product Name bellow
                    </Dialog.Description>
                    <Dialog.Input placeholder={'Name'} onChangeText={val => this.newProductNameInputChange(val)}/>
                    <Dialog.Input keyboardType = 'numeric' placeholder={'Quantity'} onChangeText={val => this.newProductQuantityInputChange(val)}/>
                    <Dialog.Button label="Cancel" onPress={() => {this.handleCancel()}} />
                    <Dialog.Button label="Add" onPress={() => {this.handleAddProduct()}} />
                  </Dialog.Container>
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

  newProductsButton: {
    marginTop: 5,
    width: '35%',
    backgroundColor: '#74848f',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginHorizontal: 8,
    color: 'white',
    justifyContent: 'center',
},

  orderDetailsHeading: {
    backgroundColor: '#0094FF',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 6,
    marginTop: 25,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  listItemKey: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5f6b73',
    marginLeft: 20,
  },

  listItemValue: {
      fontSize: 17,
      fontWeight: 'normal',
      color: '#5f6b73',
  },

  addNewIdentifierButton: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0094FF',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
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

