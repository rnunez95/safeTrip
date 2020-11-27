import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Snackbar, Surface} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const safetripLogo = require('../images/SafeTrip.png');
const timeline = require('../images/Timeline.png');
const sympotoms = require('../images/symptoms.png');

const snack = () => {
  return (
    <Snackbar
      visible={false}
      // onDismiss={onDismissSnackBar}
      action={{
        label: 'Undo',
        onPress: () => {
          console.log('h');
        },
      }}>
      Hey there! I'm a Snackbar.
    </Snackbar>
  );
};

const Card1 = (props) => {
  const [name, setName] = useState('Name');
  const [userName, setUserName] = useState('UserName');
  const [chancesOfCovid, setchancesOfCovid] = useState(0);
  return (
    <Surface style={styles.extSurface}>
      <View style={styles.titleCSS}>
        <Image
          source={safetripLogo}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'stretch',
          }}
        />
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <View
        style={{
          // height: '10%',
          width: '100%',
          marginTop: '2%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orange',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5%',
          borderRadius: 20,
        }}>
        <View style={{width: '50%'}}>
          <FontAwesome5 name={'user-circle'} color="black" size={100} />
        </View>
        <View
          style={{
            width: '50%',
            alignItems: 'flex-start',
            color: 'black',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 30}}>{name}</Text>
          <Text>{userName}</Text>
          <Text
            style={{textDecorationLine: 'underline', fontWeight: 'bold'}}
            onPress={snack()}>
            Edit Account Settings
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: '5%',
          backgroundColor: 'orange',
          marginTop: '2%',
          borderRadius: 20,
        }}>
        <Text style={{alignItems: 'flex-start'}}>Chances of COVID-19 :</Text>
        <Text style={{alignSelf: 'flex-end'}}>{chancesOfCovid}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: '5%',
          backgroundColor: 'orange',
          marginTop: '2%',
          borderRadius: 20,
        }}>
        <Image
          source={timeline}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'stretch',
          }}
        />
        <Image
          source={sympotoms}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'stretch',
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          padding: '5%',
          backgroundColor: 'orange',
          marginTop: '2%',
          alignItems: 'center',
          borderRadius: 20,
        }}>
        <Text>Self Reporting for COVID</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          // padding: '5%',
          // backgroundColor: 'orange',
          marginTop: '2%',
          height: '10%',
        }}>
        <View
          style={{
            width: '49%',
            backgroundColor: 'orange',
            borderRadius: 20,
            padding: '5%',
            height: '100%',
            alignItems: 'center',
          }}>
          <Text style={{alignSelf: 'center', height: '100%'}}>
            Privacy & Terms
          </Text>
        </View>
        <View
          style={{
            width: '49%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'orange',
              borderRadius: 25,
              height: '49%',
            }}>
            <Text style={{alignSelf: 'center'}}>Report A Problem</Text>
          </View>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: 'orange',
              borderRadius: 25,
              height: '49%',
            }}>
            <Text style={{alignSelf: 'center'}}>Help Center</Text>
          </View>
        </View>
      </View>
    </Surface>
  );
};

export default Card1;
const styles = StyleSheet.create({
  extSurface: {
    padding: '3%',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: 'grey',
    color: 'red',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  titleCSS: {
    height: '12%',
    width: '100%',
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: 'orange',
  },
});
