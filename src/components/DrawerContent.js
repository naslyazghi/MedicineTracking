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
// import {AuthContext} from '../contexts/AuthContext';

export function DrawerContent(props) {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

//   const {signOut} = React.useContext(AuthContext);

//   const token = global.userTokenConst;

// Decode the token
//   var jwt_decode = require('jwt-decode');
//   var decoded = jwt_decode(token);

  // Create User
//   var user = {
//     id: decoded.id,
//     username: decoded.name,
//     email: decoded.email,
//   };


var user = {
    id: '123456',
    username: 'UserName',
    email: 'name@ucf.edu',
  };



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
                <Feather name="home" color={color} size={size} />
              )}
              label="Orders"
              onPress={() => {
                props.navigation.navigate('OrdersTab');
              }}
            />

            {/* 2 - Inventory tab */}
            <DrawerItem
            style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="smile" color={color} size={size} />
              )}
              label="Inventory"
              onPress={() => {
                props.navigation.navigate('InventoryTab');
              }}
            />

            {/* 3 - Invitation Code tab */}
            <DrawerItem
              style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="settings" color={color} size={size} />
              )}
              label="Invitation Code"
              onPress={() => {
                props.navigation.navigate('InvitationCode');
              }}
            />

            {/* 4 - Settings tab */}
            <DrawerItem
            style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />

            {/* 5 - About tab */}
            <DrawerItem
            style = {styles.drawerItem}
              icon={({color, size}) => (
                <Feather name="code" color={color} size={size} />
              )}
              label="About"
              onPress={() => {
                props.navigation.navigate('About');
              }}
            />
          </Drawer.Section>
          
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
            <Feather name="log-out" color={color} size={size} />
          )}
          label="Sign Out"
          // onPress={() => {
          //   signOut();
          // }}
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
