import ContentSection from "../components/content-section";
import ProfileForm from "./profile-form";
import { useTranslation } from "react-i18next";

export default function SettingsProfile() {
  const { t } = useTranslation();

  return (
    <ContentSection
      title={t("settings.profile_section.title")}
      desc={t("settings.profile_section.description")}
    >
      <ProfileForm />
    </ContentSection>
  );
}
