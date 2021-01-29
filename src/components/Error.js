import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

export function Error({error}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },

    text: {
        color: 'red',
        fontWeight:'bold',
    }
});
