import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';



const searchEachesScreen = ({navigation}) => {
    const [scanned, setScanned] = useState(true);
    const [ndc, setNdc] = useState('');
    const [propname, setPropname ] = useState("");
    const [labeler, setLabeler ] = useState("");
    return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter as much information you have</Text>
      <View style={styles.action}>
        <TextInput
          style={styles.input}
          placeholder={'NDC CODE'}
          placeholderTextColor={'#868686'}
          onChangeText={(ndc) => setNdc(ndc)}
          value={ndc}
        />
        <TextInput
          style={styles.input}
          placeholder={'Proprietary Name'}
          placeholderTextColor={'#868686'}
          onChangeText={(propname) => setPropname(propname)}
          value={propname}
        />
        <TextInput
          style={styles.input}
          placeholder={'Labeler'}
          placeholderTextColor={'#868686'}
          onChangeText={(labeler) => setLabeler(labeler)}
          value={labeler}
        />
        <Button 
        title={'Tap to Search'} 
        onPress={() => setScanned(false)} 
        />
      </View>  

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
  },

  input: {
      flex: 0,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
      padding: 5,
  },

  heading: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 5,
    backgroundColor: '#74848f',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
  }
});


export default searchEachesScreen;


