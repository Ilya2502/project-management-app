import React from 'react';
import Header from 'components/header/header';
import WelcomePage from 'pages/welcome-page/welcome-page';
import Footer from 'components/footer/footer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <WelcomePage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
