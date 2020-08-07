/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, FormEvent } from 'react';

import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import PageHeader from '../../components/PageHeader';

import icon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

interface IScheduleItem {
  week_day: string;
  to: string;
  from: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState<IScheduleItem[]>([
    {
      week_day: '',
      to: '',
      from: '',
    },
  ]);

  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [cost, setCost] = useState('');
  const [subject, setSubject] = useState('');

  const handleAddNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: '',
        to: '',
        from: '',
      },
    ]);
  };

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/classes', {
        name,
        avatar,
        bio,
        whatsapp,
        cost: Number(cost),
        subject,
        schedule: scheduleItems,
      });

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      }
    } catch {
      alert('Erro no cadastro!');
    }
  };

  const handleChangeScheduleItem = (
    position: number,
    field: string,
    value: string,
  ) => {
    const newSchedules = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        };
      }

      return scheduleItem;
    });

    setScheduleItems(newSchedules);
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        subtitle="O primeiro passo é preencher esse formulário de inscrição."
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={e => setCost(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleAddNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
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
                  onChange={e =>
                    handleChangeScheduleItem(index, 'week_day', e.target.value)
                  }
                  value={scheduleItem.week_day}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  onChange={e =>
                    handleChangeScheduleItem(index, 'from', e.target.value)
                  }
                  value={scheduleItem.from}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  onChange={e =>
                    handleChangeScheduleItem(index, 'to', e.target.value)
                  }
                  value={scheduleItem.to}
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={icon} alt="Aviso importante" />
              Importante!
              <br />
              Prencha todos os dados.
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
