import ContentSection from "../components/content-section";
import { AppearanceForm } from "./appearance-form";
import { useTranslation } from "react-i18next";

export default function SettingsAppearance() {
  const { t } = useTranslation();

  return (
    <ContentSection
      title={t("settings.appearance_section.title")}
      desc={t("settings.appearance_section.description")}
    >
      <AppearanceForm />
    </ContentSection>
  );
}
