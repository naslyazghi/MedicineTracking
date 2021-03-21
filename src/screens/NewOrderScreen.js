import React, {useState} from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import jwt_decode from "jwt-decode";
import functions from "../helperFunctions/helpers";
// const BASE_URL = 'http://10.0.0.5:8080/';
const BASE_URL = 'http://localhost:8080/';

const NewOrderScreen = ({navigation}) => {
  const action = "create";
  const resource = "order";
  const refreshToken = global.refreshTokenConst;
  var token = global.userTokenConst;
  var pathList = [];
  // console.log("token = " + JSON.stringify(userToken));
  
  // Check Token
  const getToken = async () => {
    console.log("Get token function called ...");
    // var isTokenExpired = new Token().checkTokenIfExpired();
    var isTokenExpired = functions.checkTokenIfExpired();
    console.log("isTokenExpired = " + JSON.stringify(isTokenExpired));
    if(isTokenExpired)
    {
      console.log("Token is expired")
      const response = await fetch(BASE_URL + 'api/user/token', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              refreshToken: refreshToken,
          }),
      });

      console.log("token response = " + JSON.stringify(response));
      // 2 - Parsing the response
      var res = JSON.parse(await response.text());
      if (!res.response) 
      {
        console.log("response failed");
          Alert.alert('Error', res.message, [
              {text: 'OK'},
          ]);
          return null;
      }
      else 
      {
        console.log("Token refreshed")
          global.userTokenConst = res.Content;
          // Update Local storage
          await AsyncStorage.mergeItem('userToken', res.Content);
          console.log("Token = " + JSON.stringify(res.Content));
          return res.Content;
      }
    }
    else
    {
      console.log("Token is not expired")
      return global.userTokenConst;;
    }
  }

  
  const getCompletePathList = async () => {
    console.log("Get complete path list function called ...");
    token = getToken();
    const js = '{"action":"' + action + '","resource":"' + resource + '"}';
    const response = await fetch(BASE_URL + 'api/inventory/complete_paths', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: js,
    });
    console.log(response);
    // 2 - Parsing the response
    var res = JSON.parse(await response.text());
    if (!res.response) 
    {
      Alert.alert('Error', res.message, [
        {text: 'OK'},
      ]);
      return null;
    }
    else 
    {
      return res.Content;
    }
  }

  


  //Decode the token
  // const userToken = global.userTokenConst;
  // const decoded = jwt_decode(userToken);
  // console.log("decoded = " + decoded);
  // var user = {
  //   id: decoded.user.id,
  //   username: decoded.user.name,
  //   email: decoded.user.email,
  // };



  pathList = getCompletePathList();
  console.log("PathList = " + JSON.stringify(pathList));

  const [selectedPath, setSelectedPath] = useState('');
  
  pathList = [
    "Path1", 
    "Path2", 
    "Path3",
    "Path4", 
    "Path5", 
    "Path6",
    "Path7", 
    "Path8", 
    "Path9",
  ];

  // Process the path list
  let paths;
  if (pathList !== null)
  {
    paths = pathList.map((value, index) => {
      console.log('value: ' + value + " / index: " + index);
      return <Picker.Item label={value} value={value} key={index} />;
    });
    console.log('selected path: ' + selectedPath);
  }

  const [isDesiredOrderSectionVisible, setIsDesiredOrderSectionVisible] = React.useState(false);
  const [headingIcon, setHeadingIcon] = React.useState("plus-square");
  const showDesiredOrderSection = () => {
    setIsDesiredOrderSectionVisible(!isDesiredOrderSectionVisible)
    if (headingIcon == "plus-square")
    {
      setHeadingIcon("minus-square");
    }
    else
    {
      setHeadingIcon("plus-square")
    }
  };

  const orderExample = [
    { 
      id: '9125334514',
      path: '/home/inv1/inv12',
      user: 'Jason Smith',
      order_date: '2021-02-14T19:07:38.511',
      status: 'Arriving Late',
      expectedDelivery: '05-10-2021',
      trackingNumber: '64212466665451288',

      items: [
        {
          quantity: 5,
          product: {
              identifiers: [
                  {key: 'Name', value: 'Aspirin'}
              ]
          },
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        },
        {
          quantity: 3,
          product: {
            identifiers: [
              {key: 'Name', value: 'Bandage'},
              {key: 'NDC', value: '123-1245-23'}
            ]
          },
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        }
      ],
      
      log: [
        {
          date: '2021-02-14T20:09:22.235',
          message: 'order approved by mlc',
        },
        {
          date: '2021-02-17T09:23:21.934',
          message: 'order arrived at mlc',
        },
      ],
    },

    { 
      id: '13654886599',
      path: '/home/inv2/inv22',
      user: 'Adam Clark',
      order_date: '2021-02-14T19:07:38.511',
      status: 'Shipped',
      expectedDelivery: '03-05-2021',
      trackingNumber: '12254656984232156',
      items: [
        {
          product: {
              identifiers: [
                  {key: 'Name', value: 'Tylenol'}
              ]
          },
          quantity: 5,
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        },
        {
          product: {
            identifiers: [
              {key: 'Name', value: 'Bandage'},
              {key: 'NDC', value: '123-1245-23'}
            ]
          },
          quantity: 3,
          desired: {
            identifiers: [
              {key: 'Name', value: 'Salve'}
            ]
          }
        }
      ],
      log: [
        {
          date: '2021-02-14T20:09:22.235',
          message: 'Order approved by mlc',
        },
        {
          date: '2021-02-17T09:23:21.934',
          message: 'Order arrived at mlc',
        },
      ],
    }
  ]



  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.heading}>Add order info*</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            placeholder={'Order Number'}
            placeholderTextColor={'#868686'}
            // onChangeText={val => invitationCodeInputChange(val)}
            // onEndEditing={e => handleValidInvitationCode(e.nativeEvent.text)}
          />
        </View>
        {/* <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            placeholder={'Tracking Number'}
            placeholderTextColor={'#868686'}
            // onChangeText={val => invitationCodeInputChange(val)}
            // onEndEditing={e => handleValidInvitationCode(e.nativeEvent.text)}
          />
        </View> */}
        {/* <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            placeholder={'Order Date'}
            type={"date"}
            placeholderTextColor={'#868686'}
            // onChangeText={val => invitationCodeInputChange(val)}
            // onEndEditing={e => handleValidInvitationCode(e.nativeEvent.text)}
          />
        </View> */}
      
        <Text style={styles.heading}>Select order path*</Text>
      
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedPath}
            style={{height: 40, width: 300,}}
            onValueChange={value => setSelectedPath(value)}>
            {paths}
          </Picker>
        </View>

        <TouchableOpacity style={styles.desiredOrder} onPress={() => {
            showDesiredOrderSection();
          }}>
          <Feather name={headingIcon} style={styles.iconButton} />
          <Text style={{fontSize:18, color:'white'}}>Add desired order</Text>
        </TouchableOpacity>

        <View style={{width:'100%'}}>
          {
            isDesiredOrderSectionVisible == true ? 
              <View>
                <Text style={styles.productHeading}>Product 1</Text>
                <Text style={{marginLeft:18}}>Product 1 Details</Text>
                <Text style={styles.productHeading}>Product 2</Text>
                <Text style={{marginLeft:18}}>Product 2 Details</Text>
                <Text style={styles.productHeading}>Product 3</Text>
                <Text style={{marginLeft:18}}>Product 3 Details</Text>
              </View> 
              :
              null
          }
        </View>

        <FilledButton
          title={'Submit'}
          style={styles.submitButton}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};


export default NewOrderScreen;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },

  textInput: {
    fontSize: 16,
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#000000',
  },

  heading: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 2,
    backgroundColor: '#74848f',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
    // textAlign: 'center',
  },

  desiredOrder: {
    marginTop: 120,
    fontSize: 19,
    marginBottom: 2,
    backgroundColor: '#74848f',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  productHeading: {
    backgroundColor: '#54b8ff',
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginBottom: 5,
    marginTop: 6,
    marginHorizontal: 8,
    color: 'white',
    fontSize: 17,
},

  iconButton: {
    color: "white", 
    fontSize: 22,
    paddingRight: 6,
},

  action: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#868686',
    backgroundColor: '#FFFFFF',
  },

  picker: {
    marginTop: 0,
    marginBottom: 40,
  },

  submitButton: {
    marginTop: 25,
},
})