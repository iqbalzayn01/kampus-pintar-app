import { logout } from '../lib/actions';
import { useFormStatus } from 'react-dom';
import { Loader2, LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React, { useActionState } from 'react';
import type { ActionResult } from '@/types';

const initialState: ActionResult = { error: '', success: '' };

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <DropdownMenuItem asChild>
      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center gap-2 text-left"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Logging out...
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4" />
            Log out
          </>
        )}
      </button>
    </DropdownMenuItem>
  );
}

export function Logout() {
  const [state, formAction] = useActionState(logout, initialState);

  return (
    <form action={formAction}>
      <LogoutButton />
      {state.error && (
        <p className="px-3 py-1 text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
