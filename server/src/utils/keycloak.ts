import session from 'express-session';
import Keycloak from 'keycloak-connect';

let keycloak: Keycloak.Keycloak | undefined;
let memoryStore: session.MemoryStore;

function initKeycloak(): Keycloak.Keycloak {
  if (!keycloak) {
    memoryStore = new session.MemoryStore();
    keycloak = new Keycloak({
      store: memoryStore,
    });
  }
  return keycloak;
}

function getKeycloak(): Keycloak.Keycloak {
  if (!keycloak) {
    initKeycloak();
  }
  return keycloak;
}

function getMemoryStore(): session.MemoryStore {
  if (memoryStore) {
    return memoryStore;
  }
}

export { getKeycloak, getMemoryStore, initKeycloak };
