import 'react-native-gesture-handler';
import React from 'react';
import {View, FlatList, StyleSheet, SafeAreaView, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Alert,} from 'react-native';
import CurrentOrdersListItem from '../ListItems/CurrentOrdersListItem';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//global.groupId = null;

const CurrentOrdersList = ({navigation, itemList}) => {
    //console.log(itemList);
    const [selectedId, setSelectedId] = React.useState(null);

    // TEMP
    const renderItem = ({item}) => {
        //const backgroundColor = item.id === selectedId ? '#1B1921' : '#1B1921';
        const borderColor = item.id === selectedId ? '#0094FF' : '#0094FF';
        const borderWidth = item.id === selectedId ? 1.7 : 0.0;

        // global.groupId = selectedId;
        // console.log('Id selected = ' + selectedId);
        // console.log('Global id = ' + global.id);

        return (
            <CurrentOrdersListItem
                id={item.id}
                selectedId={selectedId}
                orderNumber={item.orderNumber}
                orderDate={item.orderDate}
                trackingNumber={item.trackingNumber}
                sender={item.sender}
                receiver={item.receiver}
                status={item.status}
                expectedDelivery={item.expectedDelivery}
                image_url={'https://homepages.cae.wisc.edu/~ece533/images/cat.png'}
                onPress={() => {setSelectedId(item.id)}}
                style={{borderColor, borderWidth}}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itemList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};


export default CurrentOrdersList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
});
