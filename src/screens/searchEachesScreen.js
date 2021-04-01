import React, { Component, useState, useEffect } from 'react';
import { ScrollView, Text, Button, TextInput, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, AppRegistry, View, Alert } from 'react-native';
import {searchProducts} from '../service/eachesService'
import { SearchBar } from 'react-native-elements';
  


const searchEachesScreen = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  

  const updateSearch = async(search) => {
    setSearch(search);
    const res = await searchProducts(search);
    if(res.response)
    {
      setSearchResult(res.Content);
    }
  }; 
  


  return (
    <View style={styles.container}> 
      <SearchBar
        placeholder="Type Here..."
        onChangeText={val => updateSearch(val)}
        value={search}
        lightTheme={true}
      /> 
      <Text style={styles.resultHeading}>{searchResult.length + " Products found"}</Text>

      <ScrollView>
        {
          searchResult.map(function(item, i) {
            return  <View key={i} style={{margin: 10}}>
                      <Text style={styles.productHeading}>{"Product " + (i+1)}</Text>
                      {item.identifiers != null ? 
                        <View>
                            {item.identifiers.map((ident, j) => (
                                <View >
                                    <Text style={styles.listItemKey} key={j}>{ident.key + ": "} 
                                        <Text style={styles.listItemValue}>{ident.value}</Text>
                                    </Text>
                                </View>
                            ))}
                        </View>
                        :
                        null
                      }
                    </View>

          })
        }
      </ScrollView>
    </View>
  );
};


export default searchEachesScreen;


const styles = StyleSheet.create({  
  container: {  
      flex: 1,  
  },  
  item: {  
      padding: 10,  
      fontSize: 18,  
      height: 44,  
  },  
  productHeading: {
    backgroundColor: '#74848f',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 5,
    marginTop: 4,
    marginHorizontal: 8,
    color: 'white',
    fontSize: 17,
  },
  resultHeading: {
    backgroundColor: '#0094FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 4,
    marginTop: 6,
    marginHorizontal: 8,
    color: 'white',
    fontSize: 17,
  },
  listItemKey: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5f6b73',
    marginLeft: 20,
  },
  listItemValue: {
      fontSize: 17,
      fontWeight: 'normal',
      color: '#5f6b73',
  },
})  
