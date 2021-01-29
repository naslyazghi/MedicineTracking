import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch,} from 'react-native-paper';
import Icon from 'react-native-ionicons';
// import {AuthContext} from '../contexts/AuthContext';
import Feather from 'react-native-vector-icons/Feather';

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

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Feather name="home" color={color} size={size} />
              )}
              label="Groups"
              // onPress={() => {
              //   props.navigation.navigate('Main');
              // }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Feather name="smile" color={color} size={size} />
              )}
              label="Profile"
              // onPress={() => {
              //   props.navigation.navigate('Profile');
              // }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Feather name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            /> */}
            <DrawerItem
              icon={({color, size}) => (
                <Feather name="code" color={color} size={size} />
              )}
              label="About"
              // onPress={() => {
              //   props.navigation.navigate('About');
              // }}
            />
          </Drawer.Section>

          <Drawer.Section title="Preferences">
            <TouchableRipple
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

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
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
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    backgroundColor: '#0094FF',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
