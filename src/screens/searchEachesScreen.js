import React, { Component, useState, useEffect } from 'react';
import { List,   FlatList, Text, Button, TextInput, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, AppRegistry, View, Alert } from 'react-native';
import {searchProducts} from '../service/eachesService'
import { SearchBar } from 'react-native-elements';
  
export default class FlatListBasics extends Component {  
  state = {
    search: '',
    arrayholder: []
  };

  updateSearch = async(search) => {
    this.setState({ search });
    const response = await searchProducts(search);
    console.log(response.Content.length);
    if(response.Content.length > 0) {
      this.setState({response});
      //console.log(this.state)
      for( var i =0; i < response.Content.length; i++) {
        //console.log(response.Content[i].identifiers)
       // console.log('HHHHHEEEEEBBBBBBBBEEEE')
       //console.log(response.Content[i].identifiers)
      }
    }

  };  
    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };  
    //handling onPress action  
    getListViewItem = (item) => {  
        Alert.alert(item.key);  
    }  
  
    render() {  
      const  search  = this.state.search; 
      const res = this.state.arrayholder;
      console.log(search)
      return (  
            <View style={styles.container}> 
              <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                lightTheme={true}
                /> 
                <FlatList  
                    // data={[  
                    //     {key: 'Android'},{key: 'iOS'}, {key: 'Java'},{key: 'Swift'},  
                    //     {key: 'Php'},{key: 'Hadoop'},{key: 'Sap'},  
                    //     {key: 'Python'},{key: 'Ajax'}, {key: 'C++'},  
                    //     {key: 'Ruby'},{key: 'Rails'},{key: '.Net'},  
                    //     {key: 'Perl'}
                    // ]}  
                    data = {res}
                    renderItem={({item}) =>  
                        <Text style={styles.item}  
                              onPress={this.getListViewItem.bind(this, item)}>{item.key}</Text>}  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
            </View>  
        );  
    }  
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
    },  
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    },  
})  
  
  
AppRegistry.registerComponent('searchEachesScreen', () => FlatListBasics);  