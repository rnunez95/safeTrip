/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * *  *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Card1 from './components/card';
import Timeline from './timeline';
import SearchScreen from './searchscreen';
import Positive from './positive';
import NoCovid from './nocovid';
import Report from './report';
import LocationPopUp from './locationpopup';
import AfterSearch from './aftersearch';
import CovidMap from './covidmap';
import SubVE from './subve';
import SafeTrip from './safetrip';

// const Card = () => {
//   return (
//     <View>
//       <Text style={{color: 'orange'}}>Step O</Text>
//     </View>
//   );
// };

const App: () => React$Node = () => {
  const [screen, setScreen] = useState('subve');
  console.log('helpo');

  const buildMain = () => {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        {/* <SafeAreaView style={styles.scrollView}> */}
        <Card1 text="Safe Trip" />
        {/* <Surface icon="account-circle-outline" /> */}
        {/* </SafeAreaView> */}
      </>
    );
  };

  if (screen === 'safetrip') {
    return <SafeTrip />;
  } else if (screen === 'timeline') {
    return <Timeline />;
  } else if (screen === 'search') {
    return <SearchScreen />;
  } else if (screen === 'positive') {
    return <Positive />;
  } else if (screen === 'nocovid') {
    return <NoCovid />;
  } else if (screen === 'report') {
    return <Report />;
  } else if (screen === 'locationpopup') {
    return <LocationPopUp />;
  } else if (screen === 'aftersearch') {
    return <AfterSearch />;
  } else if (screen === 'covidmap') {
    return <CovidMap />;
  } else if (screen === 'subve') {
    return <SubVE />;
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
    height: '100%',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    height: '50%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: 'black',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'orange',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
