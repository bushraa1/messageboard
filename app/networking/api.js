import axios from 'axios';
import {baseURL} from '../utils/constants';

//Defining some basic routes for the API for Login and Signup
const postLogin = (navigation, params) => {
  console.log(params);
  axios
    .post(baseURL + '/login', params)
    .then((response) => {
      navigation.navigate('Home', {
        user_id: response.data.id,
        name: response.data.name,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const postSignup = (navigation, params) => {
  console.log(params);
  axios
    .post(baseURL + '/signup', params)
    .then((response) => {
      alert('Account has been created!');
      navigation.navigate('Home', {
        user_id: response.data.id,
        name: response.data.name,
      });
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
export {postLogin, postSignup};
