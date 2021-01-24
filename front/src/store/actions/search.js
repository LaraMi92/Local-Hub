/**
 * @module search-actions
 * Configuration des actions sur le store recherche projet
 */

// == [CLE-VALEURS] - ACTIONS sur le store recherche projet (Reducer user)

// === Mise à jour des information de recherche
export const SEARCH_PROJECT_UPDATE = 'SEARCH_PROJECT_UPDATE';
export const SEARCH_PROJECT_EXECUTE = 'SEARCH_PROJECT_EXECUTE';
export const SEARCH_PROJECT_COORDINATES = 'SEARCH_PROJECT_COORDINATES';
export const SEARCH_PROJECT_DONE = 'SEARCH_PROJECT_DONE';

// == ===================================
// == SEARCH STORE - ACTIONS CREATORS PART

export const updateSearch = (payload) => ({
  type: SEARCH_PROJECT_UPDATE,
  payload,
});

// == ===================================
// == SEARCH ACTION MIDDLEWARE - ACTIONS CREATORS PART

export const execSearch = () => ({
  type: SEARCH_PROJECT_EXECUTE,
});

export const searchProjectDone = () => ({
  type: SEARCH_PROJECT_DONE,
});

// == Call to geocoding api successful, dispatch of data

export const geoSuccess = (long, lat) => ({
  type: SEARCH_PROJECT_COORDINATES,
  long,
  lat,
});