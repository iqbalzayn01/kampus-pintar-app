import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GamificationType } from '@/types';
import React from 'react';

export function GamificationCard({ users }: GamificationType) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        Tidak ada pengguna.
      </div>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Points</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {users.map(({ id, name, image, points }) => (
          <div
            key={id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Avatar className="size-5">
                <AvatarImage src={image ?? undefined} />
                <AvatarFallback className="text-[10px]">{name}</AvatarFallback>
              </Avatar>
              <h2>{name}</h2>
              <p>{points} pts</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
