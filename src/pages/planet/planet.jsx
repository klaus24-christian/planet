import { useState, useEffect } from "react";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import styles from "./PlanetInfo.module.css";
import { getCelestialBody } from "../../utils/solarSystemData";
import { useLanguage } from "../../utils/contexts.jsx";
import { getTranslation } from "../../locales/translations";
import Planet3D from "../../components/Planet3D";

const NASA_API_KEY = "DEMO_KEY"; // Use DEMO_KEY for testing, get your own key at api.nasa.gov

const PlanetInfo = ({ planetName }) => {
  const [planet, setPlanet] = useState(null);
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    if (!planetName) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get planet data from local data
        const celestialBody = getCelestialBody(planetName);

        if (!celestialBody) {
          throw new Error(t("notFound"));
        }

        setPlanet(celestialBody);

        // Fetch NASA Astronomy Picture of the Day
        try {
          const apodRes = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
          );
          if (apodRes.ok) {
            const apodData = await apodRes.json();
            setApod(apodData);
          }
        } catch (apodError) {
          console.error("Error fetching APOD:", apodError);
          // Don't set error - APOD is optional
        }
      } catch (err) {
        console.error("Error loading planet:", err);
        setError(err.message || t("error"));
        setPlanet(null);
        setApod(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [planetName, language]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderSpinner}></div>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!planet) {
    return <p className={styles.error}>{t("notFound")}</p>;
  }

  // Get description in current language
  const description =
    planet.description[language] || planet.description.en;

  return (
    <div className={styles.planetContainer}>
      <div className={styles.box}>
        <div className={styles.box1}>
          <h1 className={styles.planetName}>{planet.name}</h1>
          <p className={styles.planetType}>{planet.type}</p>
          
          {/* 3D Planet Model */}
          <div className={styles.planet3DContainer}>
            <Planet3D 
              planetId={planet.id} 
              color={planet.color}
              size={350}
            />
          </div>
        </div>

        <div className={styles.box2}>
          {/* Description */}
          <section className={styles.infoSection}>
            <h2>{t("description")}</h2>
            <p>{description}</p>
          </section>

          {/* Characteristics */}
          <section className={styles.infoSection}>
            <h2>{t("characteristics")}</h2>
            <div className={styles.infoSection3}>
              {planet.diameter && (
                <div className={styles.characteristicCard}>
                  <span className={styles.characteristicLabel}>
                    {t("diameter")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.diameter}
                  </span>
                </div>
              )}

              {planet.mass && (
                <div className={styles.characteristicCard}>
             
                  <span className={styles.characteristicLabel}>
                    {t("mass")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.mass}
                  </span>
                </div>
              )}

              {planet.gravity && (
                <div className={styles.characteristicCard}>
            
                  <span className={styles.characteristicLabel}>
                    {t("gravity")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.gravity}
                  </span>
                </div>
              )}

              {planet.distance && (
                <div className={styles.characteristicCard}>
              
                  <span className={styles.characteristicLabel}>
                    {t("distance")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.distance}
                  </span>
                </div>
              )}

              {planet.orbitalPeriod && (
                <div className={styles.characteristicCard}>
      
                  <span className={styles.characteristicLabel}>
                    {t("orbitalPeriod")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.orbitalPeriod}
                  </span>
                </div>
              )}

              {planet.rotationPeriod && (
                <div className={styles.characteristicCard}>
        
                  <span className={styles.characteristicLabel}>
                    {t("rotationPeriod")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.rotationPeriod}
                  </span>
                </div>
              )}

              {planet.temperature && (
                <div className={styles.characteristicCard}>
    
                  <span className={styles.characteristicLabel}>
                    {t("temperature")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.temperature}
                  </span>
                </div>
              )}

              {planet.moons && (
                <div className={styles.characteristicCard}>
         
                  <span className={styles.characteristicLabel}>
                    {t("moons")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.moons}
                  </span>
                </div>
              )}

              {planet.atmosphere && (
                <div className={styles.characteristicCard}>
                  <span className={styles.characteristicLabel}>
                    {t("atmosphere")}
                  </span>
                  <span className={styles.characteristicValue}>
                    {planet.atmosphere}
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* NASA Astronomy Picture of the Day */}
      {apod && (
        <section className={styles.apodSection}>
          <h2>🌌 {t("apod")}</h2>
          {apod.media_type === "image" ? (
            <img
              src={apod.url}
              alt={apod.title}
              className={styles.apodImage}
            />
          ) : apod.media_type === "video" ? (
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <iframe
                src={apod.url}
                frameBorder="0"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                }}
              ></iframe>
            </div>
          ) : null}
          <h3 className={styles.apodTitle}>{apod.title}</h3>
          <p className={styles.apodDate}>
            {t("apodDate")}: {apod.date}
          </p>
          <p className={styles.apodExplanation}>{apod.explanation}</p>
        </section>
      )}
    </div>
  );
};

export default PlanetInfo;
