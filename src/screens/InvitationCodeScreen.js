import React from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


export function InvitationCodeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.actionBar}>
                <Feather
                    style={styles.closeIcon}
                    name={'arrow-left'}
                    color="#fff"
                    size={35}
                    onPress={() => {
                        navigation.goBack();
                    }}
                /> 
                <Text>Invitation Code</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    actionBar:{
        backgroundColor: '#0094FF',
        width: '100%',
        height: 70,
    },

    closeIcon: {
        marginLeft: 10,
        marginTop: 30,
    }
});
