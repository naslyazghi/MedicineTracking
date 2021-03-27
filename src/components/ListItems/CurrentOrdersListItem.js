import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';
import {CurrentOrderDetailsScreen} from '../../screens/CurrentOrderDetailsScreen'
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import helperFunctions from "../../helperFunctions/helpers";

const stat = null;
Moment.locale('en');

const CurrentOrdersListItem = ({id, selectedId, onPress, onLongPress, style, order, navigation}) => (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        {
            id == selectedId ?
                <View style={[styles.container, style]}>
                    <Avatar
                        size="medium"
                        overlayContainerStyle={{backgroundColor: (helperFunctions.getColor(order?.status))}}
                        rounded
                        title={'O'}
                        // title={order.user.substring(0, 1)}
                    />
                    <View style={styles.container_text}>
                        <Text style={styles.orderNumber}>{"Order #:  "}
                            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Status:  "}
                            <Text style={styles.listItemValue}>{order.status}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Ordered by:  "}
                            <Text style={styles.listItemValue}>{order.user}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Destination:  "} 
                            <Text style={styles.listItemValue}>{order.path}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Last Updated:  "} 
                            <Text style={styles.listItemValue}>{Moment(order.updatedAt).format("MM-DD-YYYY")}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Order Date:  "} 
                            <Text style={styles.listItemValue}>{Moment(order.createdAt).format("MM-DD-YYYY")}</Text>
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
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CurrentOrderDetails', {order: order})}>
                        <Feather name={"maximize-2"} style={styles.iconButton} />
                    </TouchableOpacity>
                </View>
            :
                <View style={[styles.container, style]}>
                    <Avatar
                        size="medium"
                        overlayContainerStyle={{backgroundColor: (helperFunctions.getColor(order?.status))}}
                        rounded
                        // title={order.user.substring(0, 1)}
                        title={'O'}
                    />
                    <View style={styles.container_text}>
                        <Text style={styles.orderNumber}>{"Order #: "}
                            <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Status:  "}
                            <Text style={styles.listItemValue}>{order.status}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Ordered by: "}
                            <Text style={styles.listItemValue}>{order.user}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Destination: "} 
                            <Text style={styles.listItemValue}>{order.path}</Text>
                        </Text>
                        <Text style={styles.listItemKey}>{"Last Updated: "} 
                            <Text style={styles.listItemValue}>{Moment(order.updatedAt).format("MM-DD-YYYY")}</Text>
                        </Text>
                    </View>
                </View>
        }
    </TouchableOpacity>
);

export default CurrentOrdersListItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 4,
        marginBottom: 4,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
        marginRight: 24,
        justifyContent: 'center',
    },
    container_status: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5f6b73',
    },
    listItemKey: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5f6b73',
    },
    listItemValue: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#5f6b73',
    },

    iconButton: {
        color: '#0094FF', 
        fontSize: 25,
        padding: 1,
    },
    // sender: {
    //     fontSize: 14,
    //     color: '#545454',
    // },
    // receiver: {
    //     fontSize: 14,
    //     color: '#545454',
    // },
    // date: {
    //     fontSize: 14,
    //     color: '#5f6b73',
    // },
    // status: {
    //     fontSize: 18,
    //     color: '#0094FF', 
    // },
    // warning: {
    //     fontSize: 18,
    //     color: '#d90041', 
    // },
    // photo: {
    //     height: 80,
    //     width: 50,
    // },
});
