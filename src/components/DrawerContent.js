import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch,} from 'react-native-paper';
import Icon from 'react-native-ionicons';
import Feather from 'react-native-vector-icons/Feather';
// import {AboutScreen} from '../screens/AboutScreen';
// import {SettingsScreen} from '../screens/SettingsScreen';
// import {OrdersTab} from '../tabNavigators/OrdersTab';
// import {inventoryTab} from '../tabNavigators/InventoryTab';
import {AuthContext} from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";







export function DrawerContent(props) {
  
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  const {signOut} = React.useContext(AuthContext);

  //Decode the token
  const userToken = global.userTokenConst;
  //const refreshToken = global.refreshTokenConst;
  const decoded = jwt_decode(userToken);
  //const decoded2 = jwt_decode(refreshToken);
  // console.log("token contents: " + JSON.stringify(decoded));
  // console.log("refreshToken: " + JSON.stringify(decoded2));



  var user = {
    id: decoded.user.id,
    username: decoded.user.name,
    email: decoded.user.email,
  };

  // var user = {
  //   id: "123",
  //   username: "Username",
  //   email: "Email",
  // };


  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>

        <View style={styles.drawerContent}>

          {/* User info box */}
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Feather name="user" color={'#fff'} size={49} />
              <View style={{marginLeft: 2, flexDirection: 'column'}}>
                <Title style={styles.title}>{user.username}</Title>
                <Caption style={styles.caption}>{user.email}</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  6
                </Paragraph>
                <Caption style={styles.caption}>Open Orders</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  34
                </Paragraph>
                <Caption style={styles.caption}>Delivered</Caption>
              </View>
            </View>
          </View>

          {/* First Section of the drawer items*/}
          <Drawer.Section style={styles.drawerSection}>
            {/* 1 - Orders tab */}
            <DrawerItem
              style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="shopping-bag" color={'#0094FF'} size={30} />
              )}
              label="Orders"
              labelStyle={styles.drawerElement}
              onPress={() => {
                props.navigation.navigate('OrdersTab');
              }}
            />

            {/* 2 - Inventory tab */}
            <DrawerItem
            style = {styles.drawerItem}
            overlaycolor
              icon={({color, size}) => (
                <Feather name="layers" color={'#0094FF'} size={30} />
              )}
              label="Inventory"
              labelStyle={styles.drawerElement}
              onPress={() => {
                props.navigation.navigate('InventoryTab');
              }}
            />

            {/* 6 - QR Code */}
            <DrawerItem
            style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="aperture" color={'#0094FF'} size={30} />
              )}
              label="QR Code"
              labelStyle={styles.drawerElement}
              onPress={() => {
                props.navigation.navigate('QRTab');
              }}
            />

            </Drawer.Section>
          
            {/* 3 - Invitation Code tab */}
            <DrawerItem
              style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="send" color={'#0094FF'} size={30} />
              )}
              label="Invitation Code"
              labelStyle={styles.drawerElement}
              onPress={() => {
                props.navigation.navigate('InvitationCode');
              }}
            />

            {/* 4 - Settings tab */}
            <DrawerItem
            style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="settings" color={'#0094FF'} size={30} />
              )}
              label="Settings"
              labelStyle={styles.drawerElement}
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />

            {/* 5 - About tab */}
            <DrawerItem
            style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="code" color={'#0094FF'} size={30} />
              )}
              label="About"
              labelStyle={styles.drawerElement}
              onPress={() => {
                props.navigation.navigate('About');
              }}
            />
            

          {/* Second section of the drawer items, Preferences  */}
          <Drawer.Section title="Preferences" >
            <TouchableRipple
            style = {styles.drawerItem}
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Mode</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      {/* Third section of the drawer items, Log out */}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          style = {styles.logOutBox}
          icon={({color, size}) => (
            <Feather name="log-out" color={'white'} size={30} />
          )}
          label="Sign Out"
          labelStyle = {styles.title}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}



// STYLES
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    backgroundColor: '#0094FF',
    paddingHorizontal: 3,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 0,
    fontWeight: 'bold',
    color: '#fff',
  },
  caption: {
    fontSize: 13,
    marginTop: 0,
    lineHeight: 14,
    color: '#fff',
  },
  row: {
    marginTop: 20,
    marginLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  drawerElement: {
    fontSize: 16,
    color: 'black',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  drawerSection: {
    //marginTop: 15,
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  drawerItem: {
    marginHorizontal: 0,
  },

  logOutBox: {
    marginHorizontal: 0,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    backgroundColor: '#0094FF',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
