"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionary, Locale } from "@/lib/dictionaries";

interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof dictionary["en"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Locale>("nl");

    useEffect(() => {
        const saved = localStorage.getItem("language") as Locale;
        if (saved && (saved === "en" || saved === "nl")) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Locale) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: dictionary[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
