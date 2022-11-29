import React from 'react';

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-page__title">
        <h1>Kanban</h1>
        <p>
          Our app is designed to help you get more done. We are constantly updating our software to
          make it easier and easier for your teams to complete their tasks, and for you to keep
          track of what is happening in your company.
        </p>
      </div>
      <div className="welcome-page__img">
        <img src="assets/manage-platform.png" alt="manage-platform" />
      </div>
    </div>
  );
};

export default WelcomePage;
