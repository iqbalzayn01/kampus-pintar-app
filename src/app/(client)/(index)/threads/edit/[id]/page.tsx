import { ThreadsForm } from '../../../_components/threads-form';
import { getThreadById } from '../../../lib/data';
import { ParamsType } from '@/types';
import React from 'react';

export default async function Page({ params }: ParamsType) {
  const { id } = await params;
  const thread = await getThreadById(id);

  if (!thread) {
    return null;
  }

  return (
    <div>
      <ThreadsForm type="EDIT" data={thread} />
    </div>
  );
}
