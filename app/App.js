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

// const Card = () => {
//   return (
//     <View>
//       <Text style={{color: 'orange'}}>Step O</Text>
//     </View>
//   );
// };

const App: () => React$Node = () => {
  const [screen, setScreen] = useState('main');

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

  if (screen === 'main') {
    return buildMain();
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
