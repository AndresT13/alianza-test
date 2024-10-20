// api-urls.ts

export const API_URLS = {
  clients: 'http://localhost:8090/api/clients',
  sharedKey: 'http://localhost:8090/api/sharedKey',
  create: 'http://localhost:8090/api/create',
  search: 'http://localhost:8090/api/search',
  delete: (sharedKey: string) =>
    `http://localhost:8090/api/delete/${sharedKey}`,
};
