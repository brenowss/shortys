import LinksService from '@components/app/services/LinksService';
import { useEffect, useState } from 'react';

async function fetchHits(shortLinkId: string) {
  const { hits } = await LinksService.getHits(shortLinkId);
  return hits;
}

export default async function Page({
  params,
}: {
  params: { shortLinkId: string };
}) {
  const { shortLinkId } = params;

  const hits = await fetchHits(shortLinkId);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Short Link: {shortLinkId}</h1>
      <h2 className="text-2xl font-bold mb-4">Hits: {hits}</h2>
    </div>
  );
}
