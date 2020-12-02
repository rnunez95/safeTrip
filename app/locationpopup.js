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
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class LocationPopUp extends React.Component<Props> {
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

        <View style={styles.swipeTab} />
        <View style={styles.upTriangle} />
        <View style={styles.locationPlace} />
        <Text style={styles.locationName}>{this.state.place} </Text>
        <Text style={styles.locationDescription}>
          Educational institution {'\n'}3640 Colonel Glenn Hwy -{' '}
          {this.state.distance}mi{'\n'}chances of getting COVID -{' '}
          {this.state.risk}%{' '}
        </Text>

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
  locationName: {
    position: 'absolute',
    fontSize: 25,
    top: '74%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  locationDescription: {
    position: 'absolute',
    fontSize: 17,
    top: '77.5%',
    alignSelf: 'center',
  },
  locationPlace: {
    position: 'absolute',
    height: 110,
    width: 360,
    backgroundColor: 'orange',
    top: '73%',
    borderRadius: 25,
    alignSelf: 'center',
  },
  swipeTab: {
    position: 'absolute',
    height: 200,
    width: 415,
    backgroundColor: '#fed8b1',
    top: '70%',
    borderRadius: 25,
  },
  upTriangle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '70.5%',
    transform: [{rotate: '180deg'}],

    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
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
