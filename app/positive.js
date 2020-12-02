import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import HomePage from './App.js';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker,
  ScrollView,
  CheckBox,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class Positive extends React.Component<Props> {
  constructor() {
    super();
    this.state = {
      latitude: 39.78267584557012,
      longitude: -84.06150517123183,
      place: 'Wright State Univeristy',
      risk: 34,
      distance: 0.5,
    };
  }

  render() {
    return (
      <View style={styles.background}>
        <Image
          style={styles.backButton}
          source={require('./images/backarrow.png')}
        />
        <Text style={styles.titleScreen}>Self reporting for COVID </Text>

        <View style={styles.addButtonBox} />
        <Text style={styles.addButton}>COVID test</Text>
        <View style={styles.doneButtonBox} />
        <Text style={styles.doneButton}>Done</Text>
        <View style={styles.notButtonBox} />
        <Text style={styles.notButton}>Not yet</Text>
        <View style={styles.saveButtonBox} />
        <Text style={styles.addButton1}>
          Please enter how many days before you been tested
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder="mm/dd/yyyy"
          placeholderTextColor="orange"
        />
        <Text style={styles.addButton2}>Result</Text>
        <View style={styles.positiveButtonBox} />
        <Text style={styles.positiveButton}>+ve</Text>
        <View style={styles.negetiveButtonBox} />
        <Text style={styles.negetiveButton}>-ve</Text>
        <Text style={styles.saveButton}>Save</Text>

        <View style={styles.bottomTab} />
        <Text style={styles.tabSeperator}>| {'   \t   '} |</Text>

        <Image
          style={styles.searchButton}
          source={require('./images/map.png')}
        />
        <Text style={styles.searchKey}>Search</Text>

        <View style={styles.userButton1} />
        <View style={styles.userButton2} />

        <Image
          style={styles.userButton}
          source={require('./images/user.png')}
        />
        <Text style={styles.userKey}>Me</Text>

        <Image
          style={styles.covidMapButton}
          source={require('./images/virus.png')}
        />

        <Text style={styles.mapKey}>COVID map</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: '100%',
  },
  inputText: {
    top: 134,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'orange',
    padding: 8,
    margin: 10,
    width: 150,
    height: 45,
    color: 'orange',
  },
  backButton: {
    position: 'absolute',
    height: 45,
    width: 45,
    top: '3.5%',
    left: 20,
    tintColor: 'orange',
  },
  titleScreen: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
    top: '9%',
    alignSelf: 'center',
  },
  dropDown: {
    backgroundColor: 'orange',
    borderRadius: 50,
    position: 'absolute',
    alignContent: 'center',
    top: '20%',
  },
  addButtonBox: {
    height: 50,
    width: 190,
    backgroundColor: 'orange',
    borderRadius: 15,
    top: 170,
    alignSelf: 'center',
  },
  addButton: {
    top: 127,
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  addButton1: {
    top: 127,
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'orange',
  },
  addButton2: {
    top: 140,
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'orange',
  },
  positiveButton: {
    top: 128,
    fontSize: 20,
    left: 95,
    fontWeight: '400',
  },
  positiveButtonBox: {
    height: 45,
    width: 90,
    backgroundColor: 'orange',
    borderRadius: 15,
    top: 165,
    left: 70,
  },
  negetiveButton: {
    top: 60,
    fontSize: 20,
    left: 275,
    fontWeight: '400',
  },
  negetiveButtonBox: {
    height: 45,
    width: 90,
    backgroundColor: '#fed8b1',
    borderRadius: 15,
    top: 96,
    left: 250,
  },
  doneButtonBox: {
    height: 45,
    width: 120,
    backgroundColor: 'orange',
    borderRadius: 15,
    top: 160,
    alignSelf: 'center',
  },
  doneButton: {
    top: 125,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '400',
  },
  notButtonBox: {
    height: 45,
    width: 120,
    backgroundColor: '#fed8b1',
    borderRadius: 15,
    top: 160,
    alignSelf: 'center',
  },
  notButton: {
    top: 125,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '400',
  },
  saveButtonBox: {
    height: 40,
    width: 80,
    backgroundColor: 'orange',
    borderRadius: 15,
    top: 450,
    left: 130,
    alignSelf: 'center',
  },
  saveButton: {
    top: 106,
    left: 130,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  bottomTab: {
    position: 'absolute',
    width: 500,
    height: 88,
    backgroundColor: 'orange',
    top: 212,
  },
  tabSeperator: {
    position: 'absolute',
    top: 117,
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: '100',
  },
  searchButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 820,
    left: 35,
  },
  userButton: {
    position: 'absolute',
    width: 90,
    height: 90,
    top: 765,
    alignSelf: 'center',
  },
  userButton1: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: 'orange',
    top: 765,
    alignSelf: 'center',
  },
  userButton2: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 140 / 2,
    top: 757,
    backgroundColor: 'orange',
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center',
  },
  covidMapButton: {
    position: 'absolute',
    width: 55,
    height: 55,
    top: 815,
    left: 319,
  },
  searchKey: {
    position: 'absolute',
    top: 870,
    left: 32,
    fontSize: 20,
    fontWeight: '500',
  },
  userKey: {
    position: 'absolute',
    top: 870,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  mapKey: {
    position: 'absolute',
    top: 870,
    left: 296,
    fontSize: 19,
    fontWeight: '500',
  },
});
