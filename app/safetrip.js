import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HomePage from './safetrip.js';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 15,
      userName: 'Jimmy Anderson',
      userID: 'jimmy18',
    };
  }
  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.titleText}> SAFE TRIP </Text>
        <Image style={styles.img} source={require('./images/logo.png')} />
        <View style={styles.titleBar} />
        <Image style={styles.user} source={require('./images/user.png')} />
        <View style={{top: -38, paddingLeft: 150}}>
          <Text style={styles.usertextFormat}>{this.state.userName}</Text>
        </View>
        <View style={{top: -28, paddingLeft: 150, left: 5}}>
          <Text style={styles.usertextFormat1}>{this.state.userID}</Text>
        </View>
        <View style={{top: -18, paddingLeft: 150, left: 5}}>
          <Text style={styles.usertextFormat2}>Edit account settings</Text>
        </View>

        <View style={styles.secondBar} />
        <View style={{top: -27, alignSelf: 'center'}}>
          <Text style={styles.textFormat2}>
            Chances of COVID-19 : {this.state.score}%{' '}
          </Text>
        </View>

        <Image
          style={styles.img2}
          source={require('./images/timelineButton.png')}
        />

        <Image
          style={styles.img3}
          source={require('./images/reportButton.png')}
        />

        <View style={styles.thirdBar} />
        <View style={{top: 176, alignItems: 'center'}}>
          <Text style={styles.textFormat}>Self report for COVID</Text>
        </View>

        <View style={styles.privacyBar} />
        <View style={{top: 131, left: 30}}>
          <Text style={styles.textFormat}>Privacy{'\n'} & terms</Text>
        </View>

        <View style={styles.reportBar} />
        <View style={{top: 19, left: 212}}>
          <Text style={styles.textFormat1}>Report a problem</Text>
        </View>

        <View style={styles.helpCenterBar} />
        <View style={{top: 1, left: 235}}>
          <Text style={styles.textFormat1}>Help center</Text>
        </View>

        <View style={styles.bottomTab} />
        <View style={{top: -8, left: 123}}>
          <Text style={styles.tabSeperator}>| {'   \t   '} |</Text>
        </View>

        <Image
          style={styles.searchButton}
          source={require('./images/map.png')}
        />
        <View style={{top: -30, left: 31}}>
          <Text style={styles.searchKey}>search</Text>
        </View>

        <View style={styles.userButton1} />
        <View style={styles.userButton2} />

        <Image
          style={styles.userButton}
          source={require('./images/userButton.png')}
        />
        <View style={{top: -53, alignSelf: 'center'}}>
          <Text style={styles.searchKey}>Me</Text>
        </View>

        <Image
          style={styles.covidMapButton}
          source={require('./images/virus.png')}
        />
        <View style={{top: -81, left: 295}}>
          <Text style={styles.searchKey}>COVID map</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleBar: {
    width: 195 * 2,
    height: 140,
    borderRadius: 25,
    backgroundColor: 'orange',
    top: '10%',
    left: '2%',
  },
  titleText: {
    fontSize: 30,
    top: 70,
    color: 'orange',
    textAlign: 'center',
  },
  secondBar: {
    width: 195 * 2,
    height: 55,
    borderRadius: 25,
    backgroundColor: 'orange',
    top: '2%',
    left: '2%',
  },
  bottomTab: {
    width: 500,
    height: 88,
    backgroundColor: 'orange',
    top: '9%',
  },
  tabSeperator: {
    fontSize: 70,
    fontWeight: '100',
  },
  searchButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '91%',
    left: 35,
  },
  userButton: {
    position: 'absolute',
    width: 90,
    height: 90,
    top: '85%',
    alignSelf: 'center',
  },
  userButton1: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: 'orange',
    top: '85%',
    alignSelf: 'center',
  },
  userButton2: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 140 / 2,
    top: '84.2%',
    backgroundColor: 'orange',
    borderWidth: 4,
    borderColor: 'black',
    alignSelf: 'center',
  },
  covidMapButton: {
    position: 'absolute',
    width: 55,
    height: 55,
    top: '91%',
    left: 325,
  },
  searchKey: {
    fontSize: 20,
    fontWeight: '500',
  },
  background: {
    backgroundColor: 'black',
    height: '100%',
  },
  img: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 10,
    right: 180,
  },
  user: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 145,
    left: 25,
  },
  img2: {
    position: 'absolute',
    width: 180,
    height: 189,
    top: 360,
    left: 10,
    borderRadius: 25,
  },
  img3: {
    position: 'absolute',
    width: 180,
    height: 187,
    top: 360,
    left: 210,
    borderRadius: 25,
  },
  thirdBar: {
    width: 195 * 2,
    height: 55,
    borderRadius: 25,
    backgroundColor: 'orange',
    top: '25%',
    left: '2%',
  },
  privacyBar: {
    width: 155,
    height: 90,
    borderRadius: 25,
    backgroundColor: 'orange',
    top: '24%',
    left: '2%',
  },
  reportBar: {
    width: 215,
    height: 41,
    borderRadius: 25,
    backgroundColor: 'orange',
    top: '6%',
    left: '45%',
  },
  helpCenterBar: {
    width: 215,
    height: 41,
    borderRadius: 25,
    backgroundColor: 'orange',
    top: '4%',
    left: '45%',
  },
  textFormat: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textFormat1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textFormat2: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  usertextFormat: {
    fontSize: 30,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  usertextFormat1: {
    fontSize: 20,
    fontWeight: '300',
  },
  usertextFormat2: {
    fontSize: 20,
    fontWeight: '300',
    color: 'green',
    textDecorationLine: 'underline',
  },
});
