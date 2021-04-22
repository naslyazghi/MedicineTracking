import React, { Component, useState, useEffect }  from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Dialog from "react-native-dialog";
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {FilledButton} from '../components/FilledButton';
import Moment from 'moment';
import { upperCaseFirst } from "upper-case-first";
import helperFunctions from "../helperFunctions/helpers";
import {confirmEaches} from "../service/eachesService";
import {updateOrder} from "../service/orderService";
import functions from "../helperFunctions/helpers";


export function EditEachesScreen({route, navigation}) {
    const {product, confirmEaches, order} = route.params;

    const logs = order.log;
    const backgroundColor = helperFunctions.getColor(order?.status);

    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");
    const [isAddEachesDialogVisible, setIsAddEachesDialogVisible] = useState(false);
    const [newEaches, setNewEaches] = useState({});
    const [newEachesTemp, setNewEachesTemp] = useState({});
    const [eachesLevel, setEachesLevel] = useState(1);
    const [eachesRef, setEachesRef] = useState(undefined);
    // var eachesLevel = 1;
    // var newEaches = {};


    const addEaches = (newEaches) => {
        console.log("new eaches with level " + eachesLevel + " = " + JSON.stringify(newEaches));
        return (
            <View style={{marginLeft:15}} key={eachesLevel}>
                <Text style={[styles.eachesHeading, {backgroundColor: 'hsl(' + (206+eachesLevel*0) + ',' + (12+eachesLevel*0) + '%,'  + (45+eachesLevel*10) + '%)'}]}>Eaches Level {eachesLevel} Contains</Text>
                <View style={{borderLeftWidth:1, borderLeftColor:'rgb(79, 92, 99)', borderBottomWidth:1, borderBottomColor:'rgb(79, 92, 99)'}}>
                    {
                        newEaches != undefined ?
                            <View>
                                <Text style={styles.listItemKey}>Quantity:  
                                    <Text style={styles.listItemValue}>{newEaches.quantity}</Text>
                                </Text>
                                <Text style={styles.listItemKey}>Unit: 
                                    <Text style={styles.listItemValue}>{newEaches.unit}</Text>
                                </Text>

                                {newEaches.contains != null ? 
                                    <View>
                                        {newEaches.contains.map((subItem, j) => (
                                            addEaches(subItem)
                                        ))}
                                    </View>
                                    :
                                    null
                                }

                                <TouchableOpacity onPress={() => {showAddEachesDialog(newEaches)}}>
                                    <Text style={styles.addNewEachesButton}>Add identifier</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        );
    };
    
    const showAddEachesDialog = (eaches) => {
        setIsAddEachesDialogVisible(true);
        setEachesRef(eaches);
    };

    const addNewEaches = (eaches) => {
        var newEachesObject = {"quantity": quantity, "unit": unit, contains: []}
        if (!eaches.hasOwnProperty("contains")) {
            eaches.contains = [];
        }
        eaches.contains.push(newEachesObject);
        setIsAddEachesDialogVisible(false);
        setEachesRef(undefined);
    };

    const updateEaches = async() => {
        product.eaches = newEaches?.contains?.[0];
        confirmEaches(product);
        console.log("==========> " + JSON.stringify(product, null, 1));

        // order.items.find(x => x.product._id == selectedProduct._id).confirmedEaches = true;
        // const updatedOrder = {_id : order._id, path:order.path, items:order.items};
        // var token = await functions.getToken();
        // console.log("Handle Confirm Eaches => token = " + JSON.stringify(token));
        // var res = await confirmEaches(token, newEaches);
        // if (!res.response) 
        // {
        //     setIsConfirmEachesDialogVisible(false);
        //     Alert.alert('Error', res.message, [
        //         {text: 'OK'},
        //     ]);
        // }
        // else
        // {
        //     order.items.find(x => x.product._id == selectedProduct._id).confirmedEaches = true;
        //     const updatedOrder = {_id : order._id, path:order.path, items:order.items};
        //     console.log("Order is " + JSON.stringify(order));
        //     const res2 = await updateOrder(updatedOrder, token);
        //     console.log("res2 = " + JSON.stringify(res2));
        //     if (!res2.response) 
        //     {
        //         setIsConfirmEachesDialogVisible(false);
        //         Alert.alert('Error', res2.message, [
        //             {text: 'OK'},
        //         ]);
        //     }
        //     else
        //     {
        //         Alert.alert('Success', 
        //             (res2.message + "\n" + "Product Id: " + res2.content._id), 
        //             [{text: 'OK'},],
        //             {cancelable: false},
        //         );
        //     }
        // }
    }

    const handleCancel = () => {
        setIsAddEachesDialogVisible(false);
        setEachesRef(undefined);
    };
    

    return (
        <View style={styles.container}>
            <View style={[styles.actionBar, {backgroundColor: backgroundColor}]}>
                <Text style={styles.heading1}>Edit Eaches{order.orderNumber}</Text>
                <Feather
                    style={styles.backIcon}
                    name={'arrow-left-circle'}
                    color="white"
                    size={40}
                    onPress={() => {
                        navigation.goBack();
                    }}
                /> 
                <Feather
                    style={styles.backIcon}
                    name={'arrow-left-circle'}
                    color="white"
                    size={40}
                    onPress={() => {
                        updateEaches();
                    }}
                /> 
            </View>
        

            {
                newEaches?.contains?.[0] == undefined ?
                <>
                    <TouchableOpacity onPress={() => {showAddEachesDialog(newEaches)}}>
                        <Text style={styles.addNewEachesButton}>Add identifier</Text>
                    </TouchableOpacity>
                </>
                :
                    addEaches(newEaches.contains[0])
            }

            <Dialog.Container visible={isAddEachesDialogVisible && eachesRef != undefined}>
                <Dialog.Title>Add Eaches</Dialog.Title>
                <Dialog.Description>
                    Add eaches identifiers
                </Dialog.Description>
                <Dialog.Input placeholder={'Unit'} onChangeText={setUnit}/>
                <Dialog.Input placeholder={'Quantity'} onChangeText={setQuantity}/>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="Add" onPress={() => {
                    addNewEaches(eachesRef)}}
                />
            </Dialog.Container>


        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    actionBar:{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: backgroundColor,
        // backgroundColor: (helperFunctions.getColor(.order?.status)),
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

    textInput: {
        fontSize: 16,
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: '#000000',
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
        fontSize: 27,
        color: 'white',
    },

    modalHeading: {
        backgroundColor: 'rgb(79, 92, 99)',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
        marginTop: 10,
        marginHorizontal: 0,
        color: 'white',
        fontSize: 20,
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
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginBottom: 6,
        marginTop: 35,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

    productHeading: {
        backgroundColor: 'rgb(79, 92, 99)',
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginBottom: 5,
        marginTop: 20,
        marginHorizontal: 0,
        color: 'white',
        fontSize: 17,
    },

    productDetails: {
        backgroundColor: 'rgb(102, 119, 127)',
        paddingHorizontal: 10,
        paddingVertical: 0,
        marginBottom: 1,
        marginTop: 6,
        marginHorizontal: 18,
        color: 'white',
        fontSize: 18,
    },

    eachesSection: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgb(102, 119, 127)',
        marginBottom: 1,
        marginTop: 6,
        marginHorizontal: 18,
        color: 'white',
        fontSize: 18,
    },

    addNewEachesButton: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5f6b73',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 5,
    },

    eachesHeading: {
        marginTop: 10,
        backgroundColor: 'rgb(102, 119, 127)',
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 18,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    eachesIcon: {
        // alignItems: 'flex-end',
    },

    listItemKey: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5f6b73',
        marginLeft: 28,
    },
    
    listItemValue: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#5f6b73',
    },

    logMessage: {
        fontSize: 17,
        marginLeft: 20,
        color: '#5f6b73',
    },

});