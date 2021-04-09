import React, { Component } from 'react';
import { AppRegistry, ScrollView, View, TextInput, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FilledButton} from '../components/FilledButton';
import Feather from 'react-native-vector-icons/Feather';
import functions from "../helperFunctions/helpers";
import Moment from 'moment';
import { upperCaseFirst } from "upper-case-first";
import Dialog from "react-native-dialog";
import {BASE_URL} from '../config';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';



class NewOrderScreen extends Component {
  //static contextType = AuthContext;

  action = "create";
  resource = "order";
  // refreshToken = global.refreshTokenConst;
  
  state = {
    token: "",
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
    items: []
  };
  
  
  async componentDidMount () {
    //assign context to component
    //const {signOut} = this.context;

    // Check if refreshtoken is expired, if so, sign out the user
    // var isRefreshedTokenExpired = functions.checkRefreshTokenIfExpired();
    // if (isRefreshedTokenExpired)
    // {
    //   signOut();
    // }
    console.log("{New Order Screen} => componentDidMount")
    this.setState({token: await functions.getToken()})
    this.setState({pathList: await this.getPathList()}) 
    this.processPathList();
  }


  //Get the full list of Paths
  async processPathList () {
    // console.log("Get complete path list function called ...");
    if (this.state.pathList !== null)
    {
      this.setState({selectedPath: this.state.pathList[0]});
      var val = this.state.pathList.map((value, index) => {
        // console.log('value: ' + value + " / index: " + index);
        return <Picker.Item label={value} value={value} key={index} />;
      });
      this.setState({paths: val});
      // console.log('selected path: ' + this.state.selectedPath);
    }
  }


  async getPathList () {
    // this.setState({token: await functions.getToken()})
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
    // console.log("{New Order Screen} => Path response = " + JSON.stringify(response));
    // 2 - Parsing the response
    var res = JSON.parse(await response.text());
    if (!res.response) 
    {
      console.log("{New Order Screen} => Path response message = " + JSON.stringify(res.response));
      // Alert.alert('Error', res.message, [
      //   {text: 'OK'},
      // ]);
      return null;
    }
    else 
    {
      // console.log("{New Order Screen} => Path response message = " + JSON.stringify(res.response));
      console.log("{New Order Screen} => Path response content = " + JSON.stringify(res.Content));
      var userToken = await AsyncStorage.getItem('userToken');
      console.log("{New Order Screen} => Current token = " + JSON.stringify(userToken) + "\n\n\n\n");
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
    this.setState({orderNumber: ""});
    this.setState({isDesiredOrderSectionVisible: false});
    this.setState({headingIcon: "plus-square"});
    this.setState({isAddNewProductDialogVisible: false});
    this.setState({isAddNewIdentifierDialogVisible: false});
    this.setState({identifiers: []});
    this.setState({productName: ""});
    this.setState({productQuantity: 0});
    this.setState({identifierKey: ""});
    this.setState({identifierValue: ""});
    this.setState({selectedPath: this.state.pathList[0]})
    this.order.orderNumber = "";
    this.order.path = "";
    this.order.items = [];
  }


  async placeOrder(orderNumber, selectedPath) {
    this.setState({token: await functions.getToken()})
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
      this.props.navigation.navigate('Current Orders');
      //this.props.navigation.goBack()
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
                  <View key={j}>
                      <Text style={styles.listItemKey}>
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

                  {/* <Text style={styles.orderDetailsHeading}>Products</Text> */}
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
    width: '100%',
    backgroundColor: '#0094FF',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 6,
    marginTop: 15,
    color: 'white',
    fontSize: 20,
  },

  desiredOrder: {
    marginTop: 140,
    fontSize: 20,
    marginBottom: 2,
    backgroundColor: '#0094FF',
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
    paddingHorizontal: 10,
    paddingVertical: 1,
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
    marginTop: 80,
  },
});


AppRegistry.registerComponent('NewOrderScreen', () => NewOrderScreen);
module.exports = NewOrderScreen;

