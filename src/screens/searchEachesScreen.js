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
      console.log("search result => " + JSON.stringify(res.Content));
    }
  }; 


  const eaches = (item, level) => {
    return (
      <View style={{marginLeft:15}}>
        <Text style={[styles.eachesHeading, {backgroundColor: 'hsl(' + (206+level*0) + ',' + (12+level*0) + '%,'  + (45+level*10) + '%)'}]}>Eaches Level {level} Contains</Text>
        <View>
          <Text style={styles.listItemKey}>Quantity: 
            <Text style={styles.listItemValue}> {item.quantity}</Text>
          </Text>
          <Text style={styles.listItemKey}>Unit: 
            <Text style={styles.listItemValue}> {item.unit}</Text>
          </Text>
        </View>

        {item.contains != null ? 
          <View>
            {item.contains.map((subItem, j) => (
              eaches(subItem, level+1)
            ))}
          </View>
          :
          null
        }
      </View>
    );
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
                      {/* Display idenifiers */}
                      {item.identifiers != null ? 
                        <View>
                            <Text style={styles.productDetails}>Identifiers</Text>
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
                      {/* Display Score*/}
                      {item.score != null ? 
                        <View>
                          <Text style={styles.productDetails}>Scores</Text>
                          <View >
                              <Text style={styles.listItemKey}>Score:
                                  <Text style={styles.listItemValue}> {item.score}</Text>
                              </Text>
                              <Text style={styles.listItemKey}>Eaches Score:
                                  <Text style={styles.listItemValue}> {item.eachesScore}</Text>
                              </Text>
                          </View>
                        </View>
                        :
                        null
                      }
                      {/* Display Eaches*/}
                      <Text style={styles.productDetails}>Eaches</Text>
                      {item.eaches != null ? 
                        eaches(item.eaches, 1)
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
  resultHeading: {
    backgroundColor: 'rgb(67, 78, 86)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 4,
    marginTop: 6,
    marginHorizontal: 8,
    color: 'white',
    fontSize: 17,
  },
  productHeading: {
    backgroundColor: 'rgb(79, 92, 99)',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 5,
    marginTop: 4,
    marginHorizontal: 0,
    color: 'white',
    fontSize: 17,
  },
  productDetails: {
    backgroundColor: 'rgb(102, 119, 127)', //rgb(128, 145, 153)
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginBottom: 1,
    marginTop: 6,
    marginHorizontal: 18,
    color: 'white',
    fontSize: 18,
  },
  eachesHeading: {
    backgroundColor: '#aab5bb',
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginBottom: 1,
    marginTop: 5,
    marginHorizontal: 18,
    color: 'white',
    fontSize: 16,
  },
  listItemKey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5f6b73',
    marginLeft: 28,
  },
  listItemValue: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#5f6b73',
  },
})  
