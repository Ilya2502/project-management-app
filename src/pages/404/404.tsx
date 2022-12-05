import React from 'react';
import { Link } from 'react-router-dom';
import { Page404Props } from './types';
import { useTranslation } from 'react-i18next';

const Page404 = (props: Page404Props) => {
  const { t } = useTranslation();
  return (
    <div className="main-container">
      <h1>{props.heading}</h1>
      <Link className="back-to-home-link" to="/">
        {t('kanban')}
      </Link>
    </div>
  );
};

export default Page404;
