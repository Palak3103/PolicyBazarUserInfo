// UserDetails.js

import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

const UserDetails = ({ route }) => {
  const { id } = route.params;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  return (
    <View>
      <Text>Name: {user.first_name} {user.last_name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Avatar: {user.avatar}</Text>
    </View>
  );
};

export default UserDetails;
