import { useEffect, useState } from 'react';
import TabManagerComponent from './tab-manager/tab-manager';
import './themes.scss';

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (window.electronAPI?.ping) {
      window.electronAPI.ping().then((res) => {
        console.log('Ping response:', res);
      });
    } else {
      console.warn('window.electronAPI is not defined');
    }
  }, []);

  return (
    <>
      <div>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{ marginBottom: '1rem' }}
        >
          Toggle Theme
        </button>
        <TabManagerComponent />
      </div>
    </>
  );
};

export default App;
