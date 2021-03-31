/*import React, { useState, useEffect } from 'react';
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
        /*onPress={navigation.navigate("SearchEachesResults", {ndc, propname, labeler})} 
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

*/

  
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import {BASE_URL} from '../config';

class searchEachesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(BASE_URL + url)
      .then(res => res.json())
      .then(res => {
        console.log(response.body);
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default searchEachesScreen;
