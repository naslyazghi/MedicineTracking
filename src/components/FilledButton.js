import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

export function FilledButton({title, style, onPress}) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={styles.text}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
    backgroundColor: '#0094FF',
    width: '60%',
    paddingVertical: 15,
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 20,
    },

    text: {
        fontSize: 20,
        color: '#fff',
    }
});