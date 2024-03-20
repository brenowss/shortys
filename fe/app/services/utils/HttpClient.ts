class HttpClient {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async makeRequest(
    path: string,
    options: { method: any; headers?: any; body?: any }
  ) {
    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value as string);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');
    let responseBody = null;

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new Error(responseBody);
  }

  get(path: string, options?: { headers: any }) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path: string, options: { body: any; headers?: any }) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path: string, options: { body: any }) {
    return this.makeRequest(path, { method: 'PUT', body: options.body });
  }

  delete(path: string, options: { headers: any }) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  patch(path: string, options: { body: any }) {
    return this.makeRequest(path, { method: 'PATCH', body: options.body });
  }
}

export default HttpClient;
