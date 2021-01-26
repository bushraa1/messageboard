import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {baseURL} from '../utils/constants';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {Card, Overlay, Button, Input, Icon} from 'react-native-elements';

const Post = ({navigation, route}) => {
  //Fetching Route Parameters
  const {
    user_id,
    name,
    post_user_id,
    post_name,
    post_title,
    post_body,
    post_id,
  } = route.params;

  //Setting up State Hooks for React Functional Component
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const SubmitButton = (navigation) => {};

  //Using Effect to load data, works like a constructor
  useEffect(() => {
    getAllPostComments(post_id);
  }, []);

  const addComment = (params) => {
    axios
      .post(baseURL + '/comment', params)
      .then((res) => {
        console.log(res);
        alert('Comment has been added!');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //API call to fetch all Post Comment Data
  const getAllPostComments = (post_id) => {
    axios
      .get(baseURL + '/comment')
      .then((response) => {
        console.log('All comments');
        setAllComments(response.data);
        console.log(allComments);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(function () {
        console.log('Finally');
      });
  };
  //A Comment is deleted if User is same and comment user_id is same
  const deleteComment = (id) => {
    axios
      .delete(baseURL + '/comment/' + id.toString())
      .then((response) => {
        console.log('Comment Deleted');
        alert('Comment has been deleted!');
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(function () {
        console.log('Finally');
      });
  };

  //Returning the Render for this screen
  return (
    <ScrollView>
      <Card>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Card.Title>{post_name}</Card.Title>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home', {
                user_id: user_id,
                name: name,
              });
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/close.png')}
            />
          </TouchableOpacity>
        </View>

        <Card.Divider />
        <Text style={{marginBottom: 10}}>{post_title}</Text>
        <Text style={{marginBottom: 10}}>{post_body}</Text>
        {allComments.map((u, i) => {
          if (u.user_id_comment == user_id) {
            return (
              <Card key={i}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Card.Title>{u.name}</Card.Title>
                  <TouchableOpacity
                    onPress={() => {
                      deleteComment(u.id);
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('../assets/rubbish.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Text>{u.comment_body}</Text>
              </Card>
            );
          } else {
            //fetch all the comments related to this post
            return (
              <Card key={i}>
                <Card.Title>{u.name}</Card.Title>
                <Text>{u.comment_body}</Text>
              </Card>
            );
          }
        })}
        <Card>
          <Input
            placeholder="Comment"
            value={comment}
            width={200}
            onChangeText={setComment}
          />
          <Button
            title="Comment"
            onPress={() =>
              addComment({
                user_id_comment: user_id,
                comment_body: comment,
                name: name,
                ref_post_id: post_id,
              })
            }
          />
        </Card>
      </Card>
    </ScrollView>
  );
};

export default Post;
