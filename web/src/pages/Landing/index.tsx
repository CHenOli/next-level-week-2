import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import study from '../../assets/images/icons/study.svg';
import giveClasses from '../../assets/images/icons/give-classes.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

interface ITotalConnections {
  total: number;
}

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function loadTotalConnections() {
      const response = await api.get<ITotalConnections>('/connections');
      setTotalConnections(response.data.total);
    }

    loadTotalConnections();
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img src={landing} alt="Plataforma de estudos" className="hero-image" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={study} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClasses} alt="Ensinar" />
            Ensinar
          </Link>
        </div>
        <span className="total-connections">
          {`Total de ${totalConnections} conexões já realizadas`}
          <img src={purpleHeart} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
