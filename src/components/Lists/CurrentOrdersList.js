import 'react-native-gesture-handler';
import React from 'react';
import {View, FlatList, StyleSheet, SafeAreaView, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Alert,} from 'react-native';
import CurrentOrdersListItem from '../ListItems/CurrentOrdersListItem';
import {createStackNavigator} from '@react-navigation/stack';
import {CurrentOrderDetailsScreen} from '../../screens/CurrentOrderDetailsScreen'
import {CurrentOrderDetailsEditableScreen} from '../../screens/CurrentOrderDetailsEditableScreen'
import {useNavigation} from '@react-navigation/native';
import helperFunctions from "../../helperFunctions/helpers";

const CurrentOrdersList = ({itemList}) => {
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = React.useState(null);
    
    // itemList.map(order => { 
    //     order.user = order?.user?.name; 
    //     return order 
    // })

    const renderItem = ({item}) => {
        const borderWidth = item._id === selectedId ? 2 : 0.0;
        const borderColor = helperFunctions.getColor(item?.status);

        return (
            <CurrentOrdersListItem
                id={item._id}
                selectedId={selectedId}
                // image_url={'https://homepages.cae.wisc.edu/~ece533/images/cat.png'}
                onPress={() => {setSelectedId(item._id)}}
                onLongPress={() => navigation.navigate('CurrentOrderDetailsEditable', {order: item})}
                style={{borderColor, borderWidth}}
                order={item}
                navigation={navigation}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={itemList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
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
