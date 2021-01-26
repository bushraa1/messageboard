import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Image, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-elements';

import {postSignup} from '../networking/api';

//Setting up the Signup Fuctional Component
const Signup = ({navigation, route}) => {
  //Using States Hooks
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Name, setName] = useState('');

  //Uses the API to make a network call to create a new User Account
  const SubmitButton = (navigation) => {
    postSignup(navigation, {
      name: Name,
      email: Email,
      password: Password,
    });
  };
  //Returns the render of the Signup Screen
  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Input
            placeholder="Name"
            style={{backgroundColor: 'white'}}
            value={Name}
            onChangeText={setName}
          />

          <Input
            placeholder="Email"
            style={{backgroundColor: 'white'}}
            value={Email}
            onChangeText={setEmail}
            borderBottomColor="#000000"
            autoCompleteType={'email'}
            autoCorrect={true}
            keyboardType={'email-address'}
            maxLength={40}
          />
          <Input
            placeholder="Password"
            style={{backgroundColor: 'white'}}
            value={Password}
            onChangeText={setPassword}
            textContentType="password"
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirm Password"
            style={{backgroundColor: 'white'}}
            value={ConfirmPassword}
            onChangeText={setConfirmPassword}
            textContentType="password"
            secureTextEntry={true}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              title="Signup"
              color="#C70039"
              buttonStyle={{width: 120}}
              onPress={() => SubmitButton(navigation)}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
