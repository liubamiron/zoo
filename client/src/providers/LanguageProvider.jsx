import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {dictionary} from "../data/dictionary";

const LanguageContext = createContext();

export const useTranslation = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
};

const langOptions = [
    { value: 'ro', label: 'ro' },
    { value: 'ru', label: 'ru' },
    { value: 'en', label: 'en' }
];


export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(langOptions[0].value);

    console.log(language, 'languageProvider')

    const t = useCallback(
        (key) => {
            return dictionary[language][key] || key;
        },
        [language],
    );

    const handleSetLanguage = useCallback(
        (lang) => {
            window.localStorage.setItem('language', lang);
            setLanguage(lang);
        },
        [setLanguage],
    );

    useEffect(() => {
        if (window !== undefined) {
            const localSetting = window.localStorage.getItem('language');
            if (localSetting) {
                handleSetLanguage(localSetting);
            }
        }
    }, [handleSetLanguage]);

    const value = useMemo(
        () => ({
            language,
            setLanguage: handleSetLanguage,
            t,
            dictionary: dictionary[language],
            langOptions,
        }),
        [language, t, handleSetLanguage],
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
};
