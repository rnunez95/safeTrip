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

export default class Report extends React.Component<Props> {
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
        <Text style={styles.titleScreen}> Report your symptoms </Text>
        <View style={styles.dropDown}>
          <Picker>
            <Picker.Item label="High fever" />
            <Picker.Item label="Sour throut" />
            <Picker.Item label="Body pains" />
            <Picker.Item label="Extreme cough" />
          </Picker>
        </View>
        <View style={styles.addButtonBox} />
        <Text style={styles.addButton}>+ Add more</Text>
        <View style={styles.saveButtonBox} />
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
    height: 40,
    width: 145,
    backgroundColor: 'orange',
    borderRadius: 15,
    top: 210,
    alignSelf: 'center',
  },
  addButton: {
    top: 177,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  saveButtonBox: {
    height: 40,
    width: 80,
    backgroundColor: 'orange',
    borderRadius: 15,
    top: 400,
    left: 130,
    alignSelf: 'center',
  },
  saveButton: {
    top: 368,
    left: 130,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  inputText: {
    top: 34,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 350,
    height: 45,
  },
  bottomTab: {
    position: 'absolute',
    width: 500,
    height: 88,
    backgroundColor: 'orange',
    top: 465,
  },
  tabSeperator: {
    position: 'absolute',
    top: 375,
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
