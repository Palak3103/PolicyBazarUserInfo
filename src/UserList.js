import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { setUsers } from './redux';

const UserList = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 3; // Total number of pages in the API

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const fetchedUsers = [];

        for (let i = 1; i <= totalPages; i++) {
          const response = await fetch(`https://reqres.in/api/users?page=${i}&per_page=5`);
          const data = await response.json();
          fetchedUsers.push(...data.data);
        }

        dispatch(setUsers(fetchedUsers));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserPress = (id) => {
    navigation.navigate('UserDetails', { id });
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingVertical: 40 }}
      onPress={() => handleUserPress(item.id)}
    >
      <Text>{item.first_name} {item.last_name}</Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item.id.toString();

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="black" />;
    }
    return null;
  };

  const loadMoreData = () => {
    if (page < totalPages && !loading) {
      setLoading(true);
      setPage(page + 1);

      const fetchData = async () => {
        try {
          const response = await fetch(`https://reqres.in/api/users?page=${page + 1}&per_page=5`);
          const data = await response.json();
          dispatch(setUsers([...users, ...data.data]));
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchData();
    }
  };

  return (
    <FlatList
      data={users}
      renderItem={renderUser}
      keyExtractor={keyExtractor}
      ListFooterComponent={renderFooter}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
    />
  );
};

export default UserList;
