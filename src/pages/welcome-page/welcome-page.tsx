import React from 'react';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="welcome-page-wrapper">
      <div className="welcome-page">
        <div className="welcome-page__title">
          <h1>{t('kanban')}</h1>
          <p>
            Our app is designed to help you get more done. We are constantly updating our software
            to make it easier and easier for your teams to complete their tasks, and for you to keep
            track of what is happening in your company.
          </p>
        </div>
        <div className="welcome-page__img">
          <img src="assets/manage-platform.png" alt="manage-platform" />
        </div>
      </div>
      <div className="our-team">
        <h2 className="our-team__title">Our team</h2>
        <div className="teammates">
          <div className="teammates-person">
            <img className="teammates-person__photo" src="assets/team/mihail.png" alt="mihail" />
            <div className="teammates-person__about">
              <h3 className="teammates-person__name">Mihail</h3>
              <p className="teammates-person__position">Front-end developer</p>
              <a
                href="https://www.linkedin.com/in/prybytkin-mike/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="teammates-person">
            <img className="teammates-person__photo" src="assets/team/ilya.png" alt="ilya" />
            <div className="teammates-person__about">
              <h3 className="teammates-person__name">Ilya</h3>
              <p className="teammates-person__position">Team Lead</p>
              <a
                href="https://www.linkedin.com/in/iliia-haurychkou-92724b244/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="teammates-person">
            <img className="teammates-person__photo" src="assets/team/vitaliy.png" alt="vitaliy" />
            <div className="teammates-person__about">
              <h3 className="teammates-person__name">Vitaliy</h3>
              <p className="teammates-person__position">Front-end developer</p>
              <a
                href="https://www.linkedin.com/in/vitaliksamusenko/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
