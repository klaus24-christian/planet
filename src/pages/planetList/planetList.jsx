import React, { useEffect, useState, useMemo } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import "./list.css";
import { solarSystemBodies } from "../../utils/solarSystemData";
import { useLanguage } from "../../utils/contexts.jsx";
import { getTranslation } from "../../locales/translations";
import Planet3DCard from "../../components/Planet3DCard";

const PlanetList = ({ onSelectPlanet }) => {
  const [allBodies, setAllBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBatch, setCurrentBatch] = useState(1);
  const { language } = useLanguage();

  const batchSize = 6;

  const t = (key) => getTranslation(language, key);

  useEffect(() => {

    setTimeout(() => {
      setAllBodies(solarSystemBodies);
      setLoading(false);
    }, 500);
  }, []);


  const filteredBodies = useMemo(() => {
    if (!searchTerm) return allBodies;
    return allBodies.filter((body) =>
      body.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allBodies, searchTerm]);


  const bodiesToShow = useMemo(() => {
    return filteredBodies.slice(0, currentBatch * batchSize);
  }, [filteredBodies, currentBatch]);

 
  useEffect(() => {
    setCurrentBatch(1);
  }, [searchTerm]);

  const loadMoreBodies = () => {
    setCurrentBatch((prev) => prev + 1);
  };

  const hasMoreToLoad = bodiesToShow.length < filteredBodies.length;

  if (loading) return <h1 className="loading">{t("loading")}</h1>;

  return (
    <div className="container">
      <h1>
        {t("listTitle")} ({filteredBodies.length})
      </h1>

      {/* Search bar */}
      <div className="searchContainer">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("search")}
          className="searchInput"
        />
      </div>

      {/* Grid of celestial bodies */}
      <div className="poke">
        {bodiesToShow.map((body) => (
          <div
            key={body.id}
            className="celestialCard"
            onClick={() => onSelectPlanet(body.name)}
            style={{ borderColor: body.color }}
          >
            <h3 className="cardTitle">{body.name}</h3>
            <p className="cardType">{body.type}</p>
            <div className="cardImageContainer">
              <Planet3DCard 
                planetId={body.id}
                color={body.color}
                size={200}
              />
            </div>
            <div className="cardInfo">
              {body.diameter && (
                <div className="cardInfoItem">
                  <span className="cardInfoLabel">{t("diameter")}</span>
                  <span className="cardInfoValue">
                    {body.diameter.split(" ")[0]}
                  </span>
                </div>
              )}
              {body.moons && (
                <div className="cardInfoItem">
                  <span className="cardInfoLabel">{t("moons")}</span>
                  <span className="cardInfoValue">{body.moons}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      {hasMoreToLoad && (
        <div className="loadMoreContainer">
          <button onClick={loadMoreBodies} className="loadMoreButton">
            {t("loadMore")} ({bodiesToShow.length}/{filteredBodies.length})
          </button>
        </div>
      )}

      {/* Empty state */}
      {filteredBodies.length === 0 && (
        <div className="emptyState">
          <h2>🔭 {t("notFound")}</h2>
          <p>{t("search")}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetList;