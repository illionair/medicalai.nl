"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { dictionary, Locale } from "@/lib/dictionaries";

interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    t: typeof dictionary["en"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readSavedLanguage(): Locale {
    if (typeof window === "undefined") return "nl";
    const saved = window.localStorage.getItem("language");
    return saved === "en" || saved === "nl" ? saved : "nl";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Locale>(readSavedLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

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
