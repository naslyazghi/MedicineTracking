import React from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {FilledButton} from '../components/FilledButton';
import Moment from 'moment';
import { upperCaseFirst } from "upper-case-first";
import helperFunctions from "../helperFunctions/helpers";

export function CurrentOrderDetailsScreen({route, navigation}) {
    const {order} = route.params;
    const items = order.items;
    console.log("items = " + items);
    const logs = order.log;
    const backgroundColor = helperFunctions.getColor(order?.status);
    console.log("User = " + order.user);

    // Display the eaches for the product
    const eaches = (item, level) => {
        return (
            <View style={{marginLeft:15}} key={level}>
            <Text style={[styles.eachesHeading, {backgroundColor: 'hsl(' + (206+level*0) + ',' + (12+level*0) + '%,'  + (45+level*10) + '%)'}]}>Eaches Level {level} Contains</Text>
            <View>
                <Text style={styles.listItemKey}>Quantity: 
                    <Text style={styles.listItemValue}> {item.quantity}</Text>
                </Text>
                <Text style={styles.listItemKey}>Unit: 
                    <Text style={styles.listItemValue}> {item.unit}</Text>
                </Text>
            </View>

            {item.contains != null ? 
                <View>
                {item.contains.map((subItem, j) => (
                    eaches(subItem, level+1)
                ))}
                </View>
                :
                null
            }
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.actionBar, {backgroundColor: backgroundColor}]}>
                <Text style={styles.heading1}>Order #: {order.orderNumber}</Text>
                <Text style={styles.heading2}>{order.status}</Text>
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
                <Text style={[styles.orderDetailsHeading, {backgroundColor: backgroundColor}]}>Order Summary</Text>
                <Text style={styles.orderNumber}>{"Order #:  "}
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Status:  "}
                    <Text style={styles.listItemValue}>{order.status}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Ordered by:  "}
                    <Text style={styles.listItemValue}>{order.user}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Location: "} 
                    <Text style={styles.listItemValue}>{order.currentLocation}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Destination: "} 
                    <Text style={styles.listItemValue}>{order.path}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Last Updated:  "} 
                        <Text style={styles.listItemValue}>{Moment(order.updatedAt).format("MM-DD-YYYY")}</Text>
                    </Text>
                <Text style={styles.listItemKey}>{"Order Date:  "} 
                    <Text style={styles.listItemValue}>{Moment(order.order_date).format("MM-DD-YYYY")}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Tracking #:  "}
                    <Text style={styles.listItemValue}>
                        {order.trackingNumber == undefined ? "Not provided" : order.trackingNumber}
                    </Text>
                </Text>
                <Text style={styles.listItemKey}>{"Expected Delivery:  "} 
                    <Text style={styles.listItemValue}>
                        {order.expectedDelivery == undefined ? "Unknown" : order.trackingNumber}
                    </Text>
                </Text>

                <Text style={[styles.orderDetailsHeading, {backgroundColor: backgroundColor}]}>Products</Text>
                {items.map(function(item, i) {
                    return <View style={styles.listItemValue} key={i}>
                                {item.product != undefined ? 
                                    <View>
                                        <Text style={styles.productHeading}>{"Product " + (i+1)}</Text>
                                        <Text style={styles.productDetails}>Identifiers</Text>
                                        {item.product.identifiers != undefined ? 
                                            <View>
                                                {item.product.identifiers.map((prod, j) => (
                                                    <View key={j}>
                                                        <Text style={styles.listItemKey}>{prod.key + ": "} 
                                                            <Text style={styles.listItemValue}>{prod.value}</Text>
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                            :
                                            null
                                        }
                                        {item.quantity != undefined ?
                                            <Text style={styles.listItemKey}>{"Quantity: " +  item.quantity}</Text>
                                            :
                                            null
                                        }
                                        <Text style={styles.productDetails}>Eaches</Text>
                                        {item.product.eaches != undefined ? 
                                            eaches(item.product.eaches, 1)
                                            :
                                            null
                                        }
                                    </View>
                                    :
                                    null
                                }
                            </View>
                })}

                <Text style={[styles.orderDetailsHeading, {backgroundColor: backgroundColor}]}>Desired Products</Text>
                {items.map(function(item, i) {
                    return <View style={styles.listItemValue} key={i}>
                                <Text style={styles.productHeading}>{"Desired Product " + (i+1)}</Text>
                                {item.desired != undefined ? 
                                    <View>
                                        <Text style={styles.productDetails}>Identifiers</Text>
                                        {item.desired.identifiers.map((prod, j) => (
                                            <View key={j}>
                                                <Text style={styles.listItemKey}>{prod.key + ": "} 
                                                    <Text style={styles.listItemValue}>{prod.value}</Text>
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                    :
                                    null
                                }
                                {item.quantity != undefined ?
                                    <Text style={styles.listItemKey}>{"Desired Quantity: " + item.quantity}</Text>
                                    :
                                    null
                                }
                                <Text style={styles.productDetails}>Eaches</Text>
                                {item.desired.eaches != undefined ? 
                                    eaches(item.desired.eaches, 1)
                                    :
                                    null
                                }
                            </View>
                })}

                <Text style={[styles.orderDetailsHeading, {backgroundColor: backgroundColor}]}>Log & Activity</Text>
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
        backgroundColor: 'rgb(102, 119, 127)', //rgb(128, 145, 153)
        paddingHorizontal: 10,
        paddingVertical: 0,
        marginBottom: 1,
        marginTop: 6,
        marginHorizontal: 18,
        color: 'white',
        fontSize: 18,
    },

    eachesHeading: {
        backgroundColor: '#aab5bb',
        paddingHorizontal: 10,
        paddingVertical: 0,
        marginBottom: 1,
        marginTop: 5,
        marginHorizontal: 18,
        color: 'white',
        fontSize: 16,
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