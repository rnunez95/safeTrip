import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import HomePage from './App.js';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class AfterSearch extends React.Component<Props> {
  constructor() {
    super();
    this.state = {
      latitude: 39.78267584557012,
      longitude: -84.06150517123183,
      place: 'Wright State Univeristy',
      risk: 34,
      distance: 0.5,
    };
    this.locations = {
      latitude: 39.772440276113365,
      longitude: -84.05474139132271,
      // if risk is below 40 green, between 40 to 60 yellow, over 60 red
      color: 'green',
    };
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
          title={this.state.place}
          description={
            'Risk: ' +
            this.state.risk +
            '% \tDist: ' +
            this.state.distance +
            ' mi'
          }
        />

        <Marker
          coordinate={{
            latitude: this.locations.latitude,
            longitude: this.locations.longitude,
          }}
        />

        <View style={styles.topBar} />

        <TextInput
          style={styles.inputText}
          placeholder="Search"
          placeholderTextColor="orange"
        />
        <View style={styles.box1} />
        <Text style={styles.button1}> Sort by low risk </Text>
        <View style={styles.box2} />
        <Text style={styles.button2}> Sort by high risk </Text>
        <View style={styles.box3} />
        <Text style={styles.button3}>open now</Text>
        <View style={styles.box4} />
        <Text style={styles.button4}>Distance</Text>
        <Text style={styles.crossButton}> X </Text>

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
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  inputText: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    padding: 8,
    margin: 10,
    width: 380,
    height: 45,
    borderColor: 'orange',
  },
  topBar: {
    position: 'absolute',
    height: 130,
    width: 500,
    top: 0,
    backgroundColor: 'black',
  },
  crossButton: {
    position: 'absolute',
    fontSize: 20,
    color: 'orange',
    top: '4.3%',
    left: 359,
  },
  box1: {
    position: 'absolute',
    height: 40,
    width: 120,
    borderRadius: 15,
    top: 83,
    left: 3,
    borderColor: 'orange',
    borderWidth: 2,
  },
  button1: {
    position: 'absolute',
    top: '10.5%',
    left: 6,
    fontSize: 14,
    color: 'orange',
  },
  box2: {
    position: 'absolute',
    height: 40,
    width: 120,
    borderRadius: 15,
    top: 83,
    left: 127,
    borderColor: 'orange',
    borderWidth: 2,
  },
  button2: {
    position: 'absolute',
    top: '10.5%',
    left: 130,
    fontSize: 14,
    color: 'orange',
  },

  box3: {
    position: 'absolute',
    height: 40,
    width: 80,
    borderRadius: 15,
    top: 83,
    left: 249,
    borderColor: 'orange',
    borderWidth: 2,
  },
  button3: {
    position: 'absolute',
    top: '10.5%',
    left: 257,
    fontSize: 14,
    color: 'orange',
  },
  box4: {
    position: 'absolute',
    height: 40,
    width: 75,
    borderRadius: 15,
    top: 83,
    left: 332,
    borderColor: 'orange',
    borderWidth: 2,
  },
  button4: {
    position: 'absolute',
    top: '10.5%',
    left: 339,
    fontSize: 14,
    color: 'orange',
  },

  bottomTab: {
    position: 'absolute',
    width: 500,
    height: 88,
    backgroundColor: 'orange',
    top: '90%',
  },
  tabSeperator: {
    position: 'absolute',
    top: '80%',
    alignSelf: 'center',
    fontSize: 70,
    fontWeight: '100',
  },
  searchButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '92%',
    left: 35,
  },
  userButton: {
    position: 'absolute',
    width: 90,
    height: 90,
    top: '86.5%',
    alignSelf: 'center',
  },
  userButton1: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: 'orange',
    top: '86.5%',
    alignSelf: 'center',
  },
  userButton2: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 140 / 2,
    top: '85.6%',
    backgroundColor: 'orange',
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center',
  },
  covidMapButton: {
    position: 'absolute',
    width: 55,
    height: 55,
    top: '91.5%',
    left: 319,
  },
  searchKey: {
    position: 'absolute',
    top: '97.2%',
    left: 32,
    fontSize: 20,
    fontWeight: '500',
  },
  userKey: {
    position: 'absolute',
    top: '97.5%',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  mapKey: {
    position: 'absolute',
    top: '97.2%',
    left: 296,
    fontSize: 19,
    fontWeight: '500',
  },
});
