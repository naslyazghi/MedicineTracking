import 'react-native-gesture-handler';
import React from 'react';
import {View, FlatList, StyleSheet, SafeAreaView, Button, Text, TouchableWithoutFeedback, TouchableOpacity, Alert,} from 'react-native';
import CurrentOrdersListItem from '../ListItems/CurrentOrdersListItem';
import {createStackNavigator} from '@react-navigation/stack';
import {CurrentOrderDetailsScreen} from '../../screens/CurrentOrderDetailsScreen'
import {useNavigation} from '@react-navigation/native';

//global.groupId = null;

const CurrentOrdersList = ({itemList}) => {
    const navigation = useNavigation();
    //console.log(itemList);
    const [selectedId, setSelectedId] = React.useState(null);

    const renderItem = ({item}) => {
        //const backgroundColor = item.id === selectedId ? '#1B1921' : '#1B1921';
        const borderWidth = item.id === selectedId ? 1.7 : 0.0;
        const borderColor = item.status === "Arriving Late" || item.status === "Unknown" ? '#d90041' : '#0094FF';

        // global.groupId = selectedId;
        // console.log('Id selected = ' + selectedId);
        // console.log('Global id = ' + global.id);

        return (
            <CurrentOrdersListItem
                id={item.id}
                selectedId={selectedId}
                // image_url={'https://homepages.cae.wisc.edu/~ece533/images/cat.png'}
                onPress={() => {setSelectedId(item.id)}}
                onLongPress={() => navigation.navigate('CurrentOrderDetails', {order: item})}
                style={{borderColor, borderWidth}}
                order={item}
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
