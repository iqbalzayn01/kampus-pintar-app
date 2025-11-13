import React from 'react';

import { GamificationCard } from '../_components/gamification-card';
import { getAllUsersPoints } from '../lib/data';

export default async function Page() {
  const dataUsersPoints = await getAllUsersPoints();

  return (
    <div className="container mx-auto p-5">
      <GamificationCard users={dataUsersPoints} className="w-full" />
    </div>
  );
}
