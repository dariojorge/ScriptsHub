import { useEffect } from 'react';
import TabManagerComponent from './tab-manager/tab-manager';
import './themes.scss';
import { loadTheme } from './db/DbSettings';

const App = () => {
  useEffect(() => {
    if (window.electronAPI?.ping) {
      window.electronAPI.ping().then((res) => {
        console.log('Ping response:', res);
      });
    } else {
      console.warn('window.electronAPI is not defined');
    }


    loadTheme().then(theme => {
      document.documentElement.setAttribute('data-theme', theme.data)
    });
  }, []);

  return (
    <>
      <TabManagerComponent />
    </>
  );
};

export default App;
