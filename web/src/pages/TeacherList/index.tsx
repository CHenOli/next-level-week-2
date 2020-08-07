/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, FormEvent } from 'react';

import Input from '../../components/Input';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';

import api from '../../services/api';

import './styles.css';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        time,
        subject,
        week_day: weekDay,
      },
    });

    setTeachers(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleOnSubmit}>
          <Select
            name="subject"
            label="Matéria"
            placeholder="Selecione qual você quer ensinar"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Português', label: 'Português' },
            ]}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            value={weekDay}
            onChange={e => setWeekDay(e.target.value)}
          />
          <Input
            name="time"
            label="Horário"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map(teacher => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
