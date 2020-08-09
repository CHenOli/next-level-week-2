import React, { useMemo } from 'react';

import formatMoney from '../../utils/formatMoney';
import whatsapp from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
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
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher }) => {
  const formattedValue = useMemo(() => {
    return formatMoney(teacher.cost);
  }, [teacher]);

  const handleNewConnection = async () => {
    api.post('connections', {
      user_id: teacher.id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora:
          <strong>{formattedValue}</strong>
        </p>
        <a
          href={`https://wa.me/55${teacher.whatsapp}`}
          onClick={handleNewConnection}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsapp} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
