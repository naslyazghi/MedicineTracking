import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {FilledButton} from '../components/FilledButton';
import Moment from 'moment';
import { upperCaseFirst } from "upper-case-first";
import Dialog from "react-native-dialog";



// let identifier = require("../models/identifier.js");
// let item = require("../models/item.js");
// let order = require("../models/order.js");

const CurrentOrderDetailsEditableScreen = ({route, navigation}) => {
    let {order} = route.params;
    let items = order.items;
    let logs = order.log;
    // let identifiers;
    // console.log("items = " + items);

    // Adding new product dialog
    const [identifiers, setIdentifiers] = useState([]);
    const [isAddNewProductDialogVisible, setIsAddNewProductDialogVisible] = useState(false);
    const [isAddNewIdentifierDialogVisible, setIsAddNewIdentifierDialogVisible] = useState(false);
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [identifierKey, setIdentifierKey] = useState("");
    const [identifierValue, setIdentifierValue] = useState("");
    const showAddNewProductDialog = () => {
        setIsAddNewProductDialogVisible(true);
    };

    // let selectedProductId = 0;
    // let identifiers = [];

    const showAddNewIdentifierDialog = (identifier) => {
        setIdentifiers(identifier);
        setIsAddNewIdentifierDialogVisible(true);
    };

    const handleCancel = () => {
        setIsAddNewProductDialogVisible(false);
        setIsAddNewIdentifierDialogVisible(false);
    };

    const newProductNameInputChange = val => {
        setProductName(val);
    };

    const newProductQuantityInputChange = val => {
        setProductQuantity(val);
    };

    const newIdentifierKeyInputChange = val => {
        setIdentifierKey(val);
    };

    const newIdentifierValueInputChange = val => {
        setIdentifierValue(val);
    };

    const handleAddProduct = () => {
        var productIdentifier = {"key":"name", "value":productName}
        var newProduct = {
                id: Math.floor(Math.random() * 100) + 1,
                "product": {"identifiers":[productIdentifier]},
                "quantity": productQuantity,
                "desired": {},
            }
        order.items.push(newProduct);
        setIsAddNewProductDialogVisible(false);
    };

    const handleAddIdentifier = () => {
        var productIdentifier = {"key":identifierKey, "value":identifierValue}
        console.log("identifiers:" + JSON.stringify(identifiers));
        identifiers.push(productIdentifier);
        setIsAddNewIdentifierDialogVisible(false);
    };



    return (
        <View style={styles.container}>
            <View style={styles.actionBar}>
                <Text style={styles.heading1}>Edit Order</Text>
                <Text style={styles.heading2}>{order.id}</Text>
                <Feather
                    style={styles.backIcon}
                    name={'arrow-left-circle'}
                    color="white"
                    size={40}
                    onPress={() => {
                        navigation.goBack();
                    }}
                /> 
            </View>
            
            <ScrollView style={styles.container_text}>
                <Text style={styles.orderDetailsHeading}>Order Summary</Text>
                <Text style={styles.orderNumber}>
                    {"Order #: "}
                    <Text style={styles.orderNumber}>{order.id}</Text>
                </Text>
                <Text style={styles.listItemKey}>
                    {"Status:  "}
                    <Text style={styles.listItemValue}>{order.status}</Text>
                </Text>
                <Text style={styles.listItemKey}>
                    {"Tracking #:  "}
                    <Text style={styles.listItemValue}>{order.trackingNumber}</Text>
                </Text>
                <Text style={styles.listItemKey}>
                    {"Ordered by:  "}
                    <Text style={styles.listItemValue}>{order.user}</Text>
                </Text>
                <Text style={styles.listItemKey}>
                    {"Destination: "} 
                    <Text style={styles.listItemValue}>{order.path}</Text>
                </Text>
                <Text style={styles.listItemKey}>
                    {"Order Date:  "} 
                    <Text style={styles.listItemValue}>{Moment(order.order_date).format("MM-DD-YYYY")}</Text>
                </Text>
                <Text style={styles.listItemKey}>
                    {"Expected Delivery:   "} 
                    <Text style={styles.listItemValue}>{order.expectedDelivery}</Text>
                </Text>

                <Text style={styles.orderDetailsHeading}>Products</Text>
                {items.map(function(item, i) {
                    return <View style={styles.listItemValue} key={i}>
                                {/* <Text style={styles.productHeading}>{"Product " + (i+1)}</Text> */}
                                <Text style={styles.productHeading}>{"Product " + (i+1)}</Text>
                                <View>
                                    {item.product.identifiers.map((prod, j) => (
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
                                <TouchableOpacity onPress={() => {showAddNewIdentifierDialog(item.product.identifiers)}}>
                                    <Text style={styles.addNewIdentifierButton}>Add identifier</Text>
                                </TouchableOpacity>
                                {/* Pop up dialog to add new identifier */}
                                <Dialog.Container visible={isAddNewIdentifierDialogVisible}>
                                    <Dialog.Title>Add Identifier</Dialog.Title>
                                    <Dialog.Description>
                                        Add an identifier for the product
                                    </Dialog.Description>
                                    <Dialog.Input placeholder={'key'} onChangeText={val => newIdentifierKeyInputChange(val)}/>
                                    <Dialog.Input placeholder={'Value'} onChangeText={val => newIdentifierValueInputChange(val)}/>
                                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                                    <Dialog.Button label="Add" onPress={() => {
                                        handleAddIdentifier()}}
                                    />
                                </Dialog.Container>
                            </View>
                })}

                {/* Add a new product */}
                <TouchableOpacity style={styles.newProductsButton} onPress={showAddNewProductDialog}>
                    <Feather name={"plus-square"} style={styles.iconButton} />
                    <Text style={{fontSize:17, color:'white'}}>Add Product</Text>
                </TouchableOpacity>
                {/* Pop up dialog to add new product */}
                <Dialog.Container visible={isAddNewProductDialogVisible}>
                    <Dialog.Title>Add Product</Dialog.Title>
                    <Dialog.Description>
                        Add the product Name bellow
                    </Dialog.Description>
                    <Dialog.Input placeholder={'Name'} onChangeText={val => newProductNameInputChange(val)}/>
                    <Dialog.Input keyboardType = 'numeric' placeholder={'Quantity'} onChangeText={val => newProductQuantityInputChange(val)}/>
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    <Dialog.Button label="Add" onPress={handleAddProduct} />
                </Dialog.Container>

                {/* Desired product section */}
                <Text style={styles.orderDetailsHeading}>Desired Products</Text>
                {items.map(function(item, i) {
                    return <View style={styles.listItemValue} key={i}>
                                <Text style={styles.productHeading}>{"Desired Product " + (i+1)}</Text>
                                {item.desired.identifiers != null ? 
                                    <View>
                                        {item.desired.identifiers.map((prod, j) => (
                                            <View >
                                                <Text style={styles.listItemKey} key={j}>{prod.key + ": "} 
                                                    <Text style={styles.listItemValue}>{prod.value}</Text>
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                    :
                                    null
                                }
                                <Text style={styles.listItemKey}>{"Desired Quantity: " + item.quantity}</Text>
                            </View>
                })}

                {/* Log and Activity */}
                <Text style={styles.orderDetailsHeading}>Log & Activity</Text>
                {logs.map(function(log, i) {
                    return <View style={styles.listItemValue} key={i}>
                                <Text style={styles.productHeading}>{Moment(log.date).format("dddd, MMMM Do YYYY")}</Text>
                                <Text style={styles.logMessage}>{log.message}</Text>
                            </View>
                })}
            </ScrollView>
        </View>
    );
};

export default CurrentOrderDetailsEditableScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    actionBar:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0094FF',
        width: '100%',
        height: '30%',
        textAlign: 'center',
        paddingBottom: '0%',
    },

    body:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
    },

    iconButton: {
        color: "white", 
        fontSize: 20,
        paddingRight: 6,
    },

    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 0,
        marginBottom: 35,
    },

    heading1: {
        fontSize: 27,
        color: 'white',
    },

    heading2: {
        fontSize: 24,
        color: 'white',
    },

    backIcon: {
        // marginRight: 100,
        marginTop: 15,
    },

    orderNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5f6b73',
        marginLeft: 20,
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

    productHeading: {
        backgroundColor: '#74848f',
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginBottom: 5,
        marginTop: 6,
        marginHorizontal: 8,
        color: 'white',
        fontSize: 17,
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

    logMessage: {
        fontSize: 17,
        marginLeft: 20,
        color: '#5f6b73',
    },

});