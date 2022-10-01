import { HttpGetClient, HttpResponse } from '../data/protocols/http-request';
import { ForbiddenError } from '../utils/errors';

const base64 = (buf: ArrayBuffer) => {
  const array = Array.from(new Uint8Array(buf));
  return array.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export class NodeHttpGetClient implements HttpGetClient {
  async get(url: string): Promise<HttpResponse> {
    const res = await fetch(url);
    const format = res.headers.get('Content-Type') || 'image/jpeg';

    if (res.status === 403) throw new ForbiddenError('could not fetch data from url: ' + url);

    if (format.includes('image'))
      return {
        status: res.status || 200,
        headers: res.headers as Record<string, any>,
        data: `data:${format};base64,${base64(await res.arrayBuffer())}`,
      };

    return {
      status: res.status || 200,
      headers: res.headers as Record<string, any>,
      data: await res.json(),
    };
  }
}
