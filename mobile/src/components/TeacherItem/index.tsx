import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import whatsapp from '../../assets/images/icons/whatsapp.png';
import heart from '../../assets/images/icons/heart-outline.png';
import unfavorite from '../../assets/images/icons/unfavorite.png';

import styles from './styles';
import api from '../../services/api';

export interface ITeacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface ITeacherItemProps {
  teacher: ITeacher;
  favorited: boolean;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleWhatsappClick = () => {
    api.post('/connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  };

  const handleToggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray: ITeacher[] = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites) as ITeacher[];
    }

    if (isFavorited) {
      const index = favoritesArray.findIndex(
        favorite => favorite.id === teacher.id,
      );

      favoritesArray.splice(index, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora:
          {'  '}
          <Text style={styles.priceValue}>{`${teacher.cost} reais`}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? (
              <Image source={unfavorite} />
            ) : (
              <Image source={heart} />
            )}
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleWhatsappClick}
          >
            <Image source={whatsapp} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
