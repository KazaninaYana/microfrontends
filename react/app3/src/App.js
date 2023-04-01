import React from 'react';

const Header = React.lazy(() => import('app1/App'));

export default class App extends React.Component {
  render() {
    let component = (
      <React.Suspense fallback='Loading app1'>
        <Header />
      </React.Suspense>
    );
    return (
      <>
        {component}
      </>
    );
  }
}
