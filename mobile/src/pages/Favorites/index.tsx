import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<ITeacher[]>([]);

  const handleLoadFavorites = async () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        setFavorites(JSON.parse(response) as ITeacher[]);
      }
    });
  };

  useFocusEffect(() => {
    handleLoadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map(favorite => (
          <TeacherItem key={favorite.id} teacher={favorite} favorited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
