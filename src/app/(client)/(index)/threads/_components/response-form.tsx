'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { createResponse } from '../lib/actions';
import { ActionResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const initialState: ActionResult = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Kirim Tanggapan
    </Button>
  );
}

export function ResponseForm({ threadId }: { threadId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const createResponseWithId = createResponse.bind(null, threadId);
  const [state, formAction] = useActionState(
    createResponseWithId,
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      formRef.current?.reset();
    }
    if (state?.error) {
      toast.error('Gagal mengirim tanggapan', { description: state.error });
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tanggapan Anda</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction}>
          <Textarea
            name="content"
            placeholder="Bagikan pengetahuan dan wawasan Anda..."
            className="mb-4 min-h-[150px]"
            required
          />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
