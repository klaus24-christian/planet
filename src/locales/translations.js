// Translations for multilingual support
export const translations = {
  en: {
    title: "NASA Space Explorer",
    subtitle: "Explore Our Solar System",
    search: "Search a planet or celestial body...",
    searchButton: "Search",
    searching: "Searching...",
    viewForm: "View Details",
    viewList: "View Gallery",
    listTitle: "Celestial Bodies Gallery",
    loadMore: "Load more",
    loading: "Loading...",
    error: "Error",
    notFound: "Celestial body not found",
    
    // Planet details
    description: "Description",
    characteristics: "Characteristics",
    diameter: "Diameter",
    mass: "Mass",
    gravity: "Gravity",
    distance: "Distance from Sun",
    orbitalPeriod: "Orbital Period",
    rotationPeriod: "Rotation Period",
    temperature: "Temperature",
    moons: "Moons",
    atmosphere: "Atmosphere",
    type: "Type",
    discoveryDate: "Discovery Date",
    
    // Astronomy Picture of the Day
    apod: "Astronomy Picture of the Day",
    apodDate: "Date",
    apodTitle: "Title",
    
    // Settings
    theme: "Theme",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
  },
  
  fr: {
    title: "Explorateur Spatial NASA",
    subtitle: "Explorez Notre Système Solaire",
    search: "Rechercher une planète ou un corps céleste...",
    searchButton: "Rechercher",
    searching: "Recherche...",
    viewForm: "Voir Détails",
    viewList: "Voir Galerie",
    listTitle: "Galerie des Corps Célestes",
    loadMore: "Charger plus",
    loading: "Chargement...",
    error: "Erreur",
    notFound: "Corps céleste non trouvé",
    
    // Planet details
    description: "Description",
    characteristics: "Caractéristiques",
    diameter: "Diamètre",
    mass: "Masse",
    gravity: "Gravité",
    distance: "Distance du Soleil",
    orbitalPeriod: "Période Orbitale",
    rotationPeriod: "Période de Rotation",
    temperature: "Température",
    moons: "Lunes",
    atmosphere: "Atmosphère",
    type: "Type",
    discoveryDate: "Date de Découverte",
    
    // Astronomy Picture of the Day
    apod: "Image Astronomique du Jour",
    apodDate: "Date",
    apodTitle: "Titre",
    
    // Settings
    theme: "Thème",
    language: "Langue",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
  },
  
  es: {
    title: "Explorador Espacial NASA",
    subtitle: "Explora Nuestro Sistema Solar",
    search: "Buscar un planeta o cuerpo celeste...",
    searchButton: "Buscar",
    searching: "Buscando...",
    viewForm: "Ver Detalles",
    viewList: "Ver Galería",
    listTitle: "Galería de Cuerpos Celestes",
    loadMore: "Cargar más",
    loading: "Cargando...",
    error: "Error",
    notFound: "Cuerpo celeste no encontrado",
    
    // Planet details
    description: "Descripción",
    characteristics: "Características",
    diameter: "Diámetro",
    mass: "Masa",
    gravity: "Gravedad",
    distance: "Distancia del Sol",
    orbitalPeriod: "Período Orbital",
    rotationPeriod: "Período de Rotación",
    temperature: "Temperatura",
    moons: "Lunas",
    atmosphere: "Atmósfera",
    type: "Tipo",
    discoveryDate: "Fecha de Descubrimiento",
    
    // Astronomy Picture of the Day
    apod: "Imagen Astronómica del Día",
    apodDate: "Fecha",
    apodTitle: "Título",
    
    // Settings
    theme: "Tema",
    language: "Idioma",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
  },
  
  it: {
    title: "Esploratore Spaziale NASA",
    subtitle: "Esplora il Nostro Sistema Solare",
    search: "Cerca un pianeta o corpo celeste...",
    searchButton: "Cerca",
    searching: "Ricerca...",
    viewForm: "Vedi Dettagli",
    viewList: "Vedi Galleria",
    listTitle: "Galleria dei Corpi Celesti",
    loadMore: "Carica altro",
    loading: "Caricamento...",
    error: "Errore",
    notFound: "Corpo celeste non trovato",
    
    // Planet details
    description: "Descrizione",
    characteristics: "Caratteristiche",
    diameter: "Diametro",
    mass: "Massa",
    gravity: "Gravità",
    distance: "Distanza dal Sole",
    orbitalPeriod: "Periodo Orbitale",
    rotationPeriod: "Periodo di Rotazione",
    temperature: "Temperatura",
    moons: "Lune",
    atmosphere: "Atmosfera",
    type: "Tipo",
    discoveryDate: "Data di Scoperta",
    
    // Astronomy Picture of the Day
    apod: "Immagine Astronomica del Giorno",
    apodDate: "Data",
    apodTitle: "Titolo",
    
    // Settings
    theme: "Tema",
    language: "Lingua",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",
  },
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};