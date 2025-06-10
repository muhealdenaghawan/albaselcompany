import { useEffect, useState } from "react";
import i18n from "i18next";

export function useRTL() {
  const [isRTL, setIsRTL] = useState(i18n.language === "ar");

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setIsRTL(lng === "ar");
    };

    // Listen for language changes
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return isRTL;
}