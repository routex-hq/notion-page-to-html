import { HttpPostClient, HttpResponse } from '../data/protocols/http-request';

export class NodeHttpPostClient implements HttpPostClient {
  async post(url: string, body: Record<string, any>): Promise<HttpResponse> {
    const urlHandler = new URL(url);
    const stringifiedBody = JSON.stringify(body);

    const res = await fetch(urlHandler.toString(), {
      method: 'POST',
      body: stringifiedBody,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': stringifiedBody.length.toString(),
      },
    });

    return {
      status: res.status,
      data: await res.json(),
    };
  }
}
