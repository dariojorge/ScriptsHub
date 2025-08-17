import { useEffect, useRef, useState } from "react";
import { loadTheme, saveTheme } from "../db/DbSettings";

const SettingsComponent = () => {
    const isInitialRender = useRef(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        isInitialRender.current = true;

        loadTheme().then(themeData => {
            document.documentElement.setAttribute('data-theme', themeData.data)
        });
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        document.documentElement.setAttribute('data-theme', theme);
        saveTheme(theme);
    }, [theme]);

    return (
        <>
            <div>⚙️ SETTINGS Content</div>
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{ marginBottom: '1rem' }}
            >
                Toggle Theme
            </button>
        </>
    );
}

export default SettingsComponent;