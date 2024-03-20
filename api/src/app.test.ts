'use strict';

import { createServer } from './app';
import t from 'tap';

t.test('requests the "/api/links" route', async (t) => {
  t.plan(3);
  const fastify = createServer();

  t.teardown(async () => {
    await fastify.close();
  });

  fastify.inject(
    {
      method: 'GET',
      url: '/api/links',
    },
    (err, response) => {
      t.error(err);
      t.equal(response?.statusCode, 200);
      t.equal(
        response?.headers['content-type'],
        'application/json; charset=utf-8'
      );
    }
  );
});
