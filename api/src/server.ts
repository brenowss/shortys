import 'dotenv/config';
import fastify from 'fastify';
import { z } from 'zod';
import sql from './lib/postgres';
import postgres from 'postgres';
import { redis } from './lib/redis';

const app = fastify({ logger: true });

app.get('/:slug', async (request, reply) => {
  const { slug } = z
    .object({
      slug: z.string().min(3),
    })
    .parse(request.params);

  const link = await sql/*sql*/ `
    SELECT id, original_url
    FROM short_links
    WHERE slug = ${slug}
  `;

  if (!link[0]) {
    return reply.status(404).send({
      message: 'Link not found',
    });
  }

  await redis.zIncrBy('hits', 1, String(link[0].id));

  return reply.redirect(link[0].original_url);
});

app.post('/api/links', async (request, reply) => {
  const { slug, url } = z
    .object({
      url: z.string().url(),
      slug: z.string().min(3),
    })
    .parse(request.body);

  try {
    const query = await sql/*sql*/ `
        INSERT INTO short_links (original_url, slug) 
        VALUES (${url}, ${slug})
        RETURNING id
      `;

    const link = query[0];

    return reply.code(201).send({
      slug,
      url,
      shortLinkId: link.id,
    });
  } catch (error) {
    if (error instanceof postgres.PostgresError) {
      if (error.code === '23505') {
        return reply.status(400).send({
          message: 'Slug already in use',
        });
      }
    }

    console.error('ERROR =>>', error);
    return reply.status(500).send({
      message: 'Something went wrong',
    });
  }
});

app.get('/api/links', async (request, reply) => {
  const links = await sql/*sql*/ `
    SELECT *
    FROM short_links
    ORDER BY created_at DESC
  `;

  return links;
});

app.get('/api/hits', async (request, reply) => {
  const hits = await redis.zRangeByScoreWithScores('hits', 0, 50);

  const result = hits
    .sort((a, b) => b.score - a.score)
    .map((hit) => {
      return {
        slug: hit.value,
        hits: hit.score,
      };
    });

  return reply.send(result);
});

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server listening on port 3000');
  });
