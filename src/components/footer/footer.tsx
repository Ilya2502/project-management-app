import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="school-link-block">
        <span>© 2022</span>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className="rss_logo" src="assets/svg/rss_logo.svg" alt="RS school logo" />
        </a>
      </div>
      <div className="team-links">
        <span></span>
        <img className="github-logo" src="assets/github-logo.png" alt="github logo" />
        <a href="https://github.com/ilya2502" target="_blank" rel="noreferrer">
          {t('Ilya')}
        </a>
        <a href="https://github.com/vitaliksamusenko" target="_blank" rel="noreferrer">
          {t('Vitaliy')}
        </a>
        <a href="https://github.com/mike-prybytkin" target="_blank" rel="noreferrer">
          {t('Mihail')}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
