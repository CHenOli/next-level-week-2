/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import heartIcon from '../../assets/images/icons/heart.png';
import teachIcon from '../../assets/images/icons/give-classes.png';

import api from '../../services/api';

import styles from './styles';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function loadTotalConnections() {
      const response = await api.get('/connections');
      setTotalConnections(response.data.total);
    }

    loadTotalConnections();
  }, []);

  const handleNavigateToGiveClasses = () => {
    navigate('GiveClasses');
  };

  const navigateToStudy = () => {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo,
        {'\n'}
        <Text style={styles.titleBold}>o que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={navigateToStudy}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClasses}
        >
          <Image source={teachIcon} />
          <Text style={styles.buttonText}>Ensinar</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de
        {' '}
        {totalConnections}
        {' '}
        conexões já realizadas
        {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
