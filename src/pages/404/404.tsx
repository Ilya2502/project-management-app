import React from 'react';
import { Link } from 'react-router-dom';
import { Page404Props } from './types';

const Page404 = (props: Page404Props) => {
  return (
    <div className="main-container">
      <h1>{props.heading}</h1>
      <Link className="back-to-home-link" to="/">
        Back to home page
      </Link>
    </div>
  );
};

export default Page404;
