import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Analytics } from "@vercel/analytics/react";

import styles from "./page.module.css";
import PlanetInfo from "./pages/planet/planet";
import PlanetList from "./pages/planetList/planetList";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTheme, useLanguage } from "./utils/contexts";
import { getTranslation } from "./locales/translations";

export default function Home() {
  const [name, setName] = useState("Earth");
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    const savedPlanet = localStorage.getItem("planet");
    if (savedPlanet) {
      setName(savedPlanet);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const searchValue = e.target[0].value;
    setName(searchValue);
    localStorage.setItem("planet", searchValue);
    setTimeout(() => setLoading(false), 500);
  };

  const handleChangePlanet = (newName) => {
    setName(newName);
    localStorage.setItem("planet", newName);
    setShowList(false);
  };

  const t = (key) => getTranslation(language, key);

  return (
    <div className={styles.page}>
      <Analytics />
      
      {/* Header with title and controls */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>
        
        <div className={styles.controls}>
          {/* Theme Toggle */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>{t("theme")}:</span>
            <div
              className={styles.themeToggle}
              onClick={toggleTheme}
              data-theme={theme}
              role="button"
              aria-label="Toggle theme"
              tabIndex={0}
            >
              <div className={styles.themeToggleSlider}>
                {theme === "dark" ? "🌙" : "☀️"}
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className={styles.controlGroup}>
            <span className={styles.controlLabel}>{t("language")}:</span>
            <div className={styles.languageSelector}>
              {["en", "fr", "es", "it"].map((lang) => (
                <button
                  key={lang}
                  className={`${styles.languageButton} ${
                    language === lang ? styles.active : ""
                  }`}
                  onClick={() => changeLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navButtons}>
        <Button
          label={t("viewForm")}
          icon="pi pi-info-circle"
          text
          raised
          onClick={() => setShowList(false)}
          disabled={!showList}
          style={{ marginRight: 8 }}
        />

        <Button
          label={t("viewList")}
          icon="pi pi-th-large"
          text
          raised
          onClick={() => setShowList(true)}
          disabled={showList}
        />
      </div>

      {/* Content */}
      {showList ? (
        <PlanetList onSelectPlanet={handleChangePlanet} />
      ) : (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <InputText
              type="text"
              placeholder={t("search")}
              required
              className={styles.input}
              disabled={loading}
              defaultValue={name}
            />
            <Button
              type="submit"
              className={styles.button}
              label={loading ? t("searching") : t("searchButton")}
              icon={loading ? "pi pi-spin pi-spinner" : "pi pi-search"}
              disabled={loading}
            />
          </form>
          <PlanetInfo planetName={name} />
        </>
      )}
    </div>
  );
}