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
                <Text style={styles.orderDetailsHeading}>Order Summary</Text>
                <Text style={styles.orderNumber}>{"Order #:  "}
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Status:  "}
                    <Text style={styles.listItemValue}>{order.status}</Text>
                </Text>
                <Text style={styles.listItemKey}>{"Ordered by:  "}
                    <Text style={styles.listItemValue}>{order.user}</Text>
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

                <Text style={styles.orderDetailsHeading}>Products</Text>
                {items.map(function(item, i) {
                    return <View style={styles.listItemValue} key={i}>
                                <Text style={styles.productHeading}>{"Product " + (i+1)}</Text>
                                <View>
                                    {item.product.identifiers.map((prod, j) => (
                                        <View >
                                            <Text style={styles.listItemKey} key={j}>{prod.key + ": "} 
                                                <Text style={styles.listItemValue}>{prod.value}</Text>
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                                <Text style={styles.listItemKey}>{"Quantity: " + item.quantity}</Text>
                            </View>
                })}

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
        backgroundColor: '#5f6b73',
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginBottom: 6,
        marginTop: 35,
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

    productHeading: {
        backgroundColor: '#99aab5',
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginBottom: 5,
        marginTop: 6,
        marginHorizontal: 8,
        color: 'white',
        fontSize: 17,
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

    logMessage: {
        fontSize: 17,
        marginLeft: 20,
        color: '#5f6b73',
    },

});