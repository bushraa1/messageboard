import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-elements';

import {postLogin} from '../networking/api';
//Setting up Login React Functional Component
const Login = ({navigation, route}) => {
  //Using States
  const [postEmail, setEmail] = useState('');
  const [errorEmail, seterrorEmail] = useState('');
  const [postPassword, setPassword] = useState('');
  //Setting up Login Post request for API
  const SubmitButton = (navigation) => {
    postLogin(navigation, {email: postEmail, password: postPassword});
  };
  //Rendering the Login View
  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Text
            style={{
              fontSize: 30,
              marginTop: 40,
              marginBottom: 40,
              textAlign: 'center',
            }}>
            Message Board App
          </Text>
          <Input
            placeholder="Email"
            leftIcon={<Icon name="user" size={24} color="black" />}
            value={postEmail}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            leftIcon={<Icon name="lock" size={24} color="black" />}
            value={postPassword}
            width={200}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button
              title="Login"
              buttonStyle={{width: 120}}
              onPress={() => SubmitButton(navigation)}
            />

            <Button
              title="Signup"
              color="#C70039"
              buttonStyle={{width: 120}}
              onPress={() => {
                navigation.navigate('Signup');
              }}
            />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
