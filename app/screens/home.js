import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {baseURL} from '../utils/constants';
import {Card} from 'react-native-elements';
import axios from 'axios';

//Setting up the Home Functional Component
const Home = ({navigation, route}) => {
  //Fetching route params send from Login/Signup screen
  const {user_id, name} = route.params;
  //Setting up React State Hooks
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [allPosts, setPosts] = useState([]);
  //Setting up Effect to fetch All Post Data after first render
  useEffect(() => {
    getAllPost();
  }, []);
  //To write a Post, making API call to database to save post
  const SubmitButton = () => {
    console.log(baseURL);
    axios
      .post(baseURL + '/create/post', {
        post_user_id: user_id,
        user_name: name,
        post_title: title,
        post_body: message,
      })
      .then((response) => {
        alert('Your post as been sucessfully added!');
        console.log(response.data);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  };
  //Gets all Posts from all users to display as feed
  getAllPost = () => {
    axios
      .get(baseURL + '/post')
      .then((response) => {
        console.log('All posts');
        setPosts(response.data);
        console.log(response.data);
        console.log(allPosts);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(function () {
        console.log('Finally');
      });
  };
  //Returning the render of Home Screen
  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Card.Title>Add a Post</Card.Title>
          <Card.Divider></Card.Divider>
          <Input
            placeholder="Write a Title for your post here!"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            placeholder="Write a message for your post here!"
            value={message}
            onChangeText={setMessage}
          />
          <Button
            buttonStyle={{width: 120, marginLeft: 220}}
            title="Post"
            color="#C70039"
            onPress={() => SubmitButton()}
          />
        </Card>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center',
            fontSize: 24,
          }}>
          View All Post
        </Text>
        {allPosts.map((u, i) => {
          //fetch all the comments related to this post
          return (
            <Card key={i}>
              <Card.Title>{u.user_name}</Card.Title>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                {u.post_title}
              </Text>
              <Button
                title="Show Post"
                buttonStyle={{width: 120, marginLeft: 220}}
                onPress={() => {
                  navigation.navigate('Post', {
                    user_id: user_id,
                    name: name,
                    post_id: u.id,
                    post_user_id: u.post_user_id,
                    post_name: u.user_name,
                    post_title: u.post_title,
                    post_body: u.post_body,
                  });
                  console.log('View Post Clicked!');
                }}
              />
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
