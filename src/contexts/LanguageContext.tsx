import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = {
  code: string;
  name: string;
};

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  translate: (text: { [key: string]: string }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  welcome: {
    en: "Welcome to Spaza Connect",
    zu: "Wamukelekile ku-Spaza Connect",
    xh: "Wamkelekile kwi-Spaza Connect",
  },
  subtitle: {
    en: "Your complete solution for managing your spaza shop business",
    zu: "Isixazululo sakho esiphelele sokulawula ibhizinisi lakho le-spaza",
    xh: "Isisombululo sakho esipheleleyo sokulawula ishishini lakho le-spaza",
  },
  registration: {
    en: "Business Registration",
    zu: "Ukubhalisa Ibhizinisi",
    xh: "Ubhaliso Loshishino",
  },
  compliance: {
    en: "Compliance Checklist",
    zu: "Uhlu Lokuhlola Ukuthobela",
    xh: "Uluhlu Lokuthobela",
  },
  resources: {
    en: "Learning Resources",
    zu: "Izinsiza Zokufunda",
    xh: "Izixhobo Zokufunda",
  },
  analytics: {
    en: "Business Analytics",
    zu: "Ukuhlaziywa Kwebhizinisi",
    xh: "Uhlalutyo Loshishino",
  },
  registerDesc: {
    en: "Register your spaza shop and get all necessary permits",
    zu: "Bhalisa isitolo sakho se-spaza uthole zonke izimvume ezidingekayo",
    xh: "Bhalisa ivenkile yakho ye-spaza ufumane zonke iimvume eziyimfuneko",
  },
  complianceDesc: {
    en: "Track and maintain your business compliance",
    zu: "Landelela futhi ugcine ukuthobela kwebhizinisi lakho",
    xh: "Landela kwaye ugcine ukuthobela kushishino lwakho",
  },
  resourcesDesc: {
    en: "Access guides and educational materials",
    zu: "Finyelela imihlahlandlela nezinto zokufunda",
    xh: "Fikelela kwizikhokelo neencwadi zokufunda",
  },
  analyticsDesc: {
    en: "Track your business performance",
    zu: "Landelela ukusebenza kwebhizinisi lakho",
    xh: "Landela ukusebenza kweshishini lakho",
  },
  documentHub: {
    en: "Document Hub",
    zu: "Isikhungo Samadokhumenti",
    xh: "Iziko Lamaxwebhu",
  },
  documentHubDesc: {
    en: "Secure storage for certificates, IDs, and compliance documents",
    zu: "Ukugcina okuphephile kwezitifiketi, ama-ID, namadokhumenti okuhambisana",
    xh: "Ugcino olukhuselekileyo lwezatifikethi, ii-ID, kunye namaxwebhu okuthobela",
  },
  uploadDocument: {
    en: "Upload Document",
    zu: "Layisha Idokhumenti",
    xh: "Layisha Uxwebhu",
  },
  selectFile: {
    en: "Select File",
    zu: "Khetha Ifayela",
    xh: "Khetha Ifayile",
  },
  supportedFormats: {
    en: "Supported formats: PDF, JPG, PNG (max 10MB)",
    zu: "Izifomathi ezisekelwayo: PDF, JPG, PNG (max 10MB)",
    xh: "Iifomathi ezixhaswayo: PDF, JPG, PNG (max 10MB)",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const translate = (text: { [key: string]: string }) => {
    return text[currentLanguage] || text["en"];
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
