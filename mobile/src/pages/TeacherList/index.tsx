import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [filterShown, setFilterShown] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  const handleLoadFavorites = async () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const parsedFavorites = JSON.parse(response) as ITeacher[];
        const favoritesIds = parsedFavorites.map(teacher => {
          return teacher.id;
        });

        setFavorites(favoritesIds);
      }
    });
  };

  useFocusEffect(() => {
    handleLoadFavorites();
  });

  const handleToggleFilter = () => {
    setFilterShown(!filterShown);
  };

  const handleFiltersSubmit = async () => {
    handleLoadFavorites();

    setFilterShown(false);

    let weekDayInt = 0;

    switch (weekDay.toLowerCase()) {
      case 'segunda-feira':
        weekDayInt = 1;
        break;
      case 'terça-feira':
        weekDayInt = 2;
        break;
      case 'quarta-feira':
        weekDayInt = 3;
        break;
      case 'quinta-feira':
        weekDayInt = 4;
        break;
      case 'sexta-feira':
        weekDayInt = 5;
        break;
      case 'sábado':
      case 'sabado':
        weekDayInt = 6;
        break;
      default:
        weekDayInt = 0;
    }

    const response = await api.get('classes', {
      params: {
        time,
        subject,
        week_day: weekDayInt,
      },
    });

    setTeachers(response.data);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        // eslint-disable-next-line prettier/prettier
        headerRight={(
          <BorderlessButton onPress={handleToggleFilter}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
          // eslint-disable-next-line prettier/prettier
        )}
      >
        {filterShown && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={text => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={weekDay}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map(teacher => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
