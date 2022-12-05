import React from 'react';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="welcome-page-wrapper">
      <div className="welcome-page">
        <div className="welcome-page__title">
          <h1>{t('kanban')}</h1>
          <p>{t('OurApp')}</p>
        </div>
        <div className="welcome-page__img">
          <img src="assets/manage-platform.png" alt="manage-platform" />
        </div>
      </div>
      <div className="our-team">
        <h2 className="our-team__title">{t('OurTeam')}</h2>
        <div className="teammates">
          <div className="teammates-person">
            <img className="teammates-person__photo" src="assets/team/mihail.png" alt="mihail" />
            <div className="teammates-person__about">
              <h3 className="teammates-person__name">{t('Mihail')}</h3>
              <p className="teammates-person__position">{t('FrontEndDeveloper')}</p>
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
              <h3 className="teammates-person__name">{t('Ilya')}</h3>
              <p className="teammates-person__position">{t('TeamLead')}</p>
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
              <h3 className="teammates-person__name">{t('Vitaliy')}</h3>
              <p className="teammates-person__position">{t('FrontEndDeveloper')}</p>
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
