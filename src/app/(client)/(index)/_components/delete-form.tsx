'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ActionResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { deleteThread } from '../threads/lib/actions';
import React, { useActionState } from 'react';

const initialState: ActionResult = {
  error: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </>
      )}
    </Button>
  );
};

export function DeleteForm({
  id,
  path,
  children,
}: {
  id: string;
  path: string;
  children: React.ReactNode;
}) {
  const deleteThreadWithArgs = deleteThread.bind(null, id, path);
  const [state, formAction] = useActionState(
    deleteThreadWithArgs,
    initialState
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Diskusi?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus diskusi ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
            {state?.error && (
              <p className="text-sm text-destructive pt-2">{state.error}</p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <SubmitButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
