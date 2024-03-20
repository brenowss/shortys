import HttpClient from './utils/HttpClient';

class LinksService {
  httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async createLink(data: { slug: string; url: string }) {
    return this.httpClient.post('/api/links', {
      body: data,
    });
  }

  async listLinks() {
    return this.httpClient.get('/api/links');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LinksService();
