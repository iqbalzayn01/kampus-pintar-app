'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { createThread } from '../lib/actions';
import { ActionResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const initialState: ActionResult = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="flex-1 sm:flex-none">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mengirim...
        </>
      ) : (
        'Buat Diskusi'
      )}
    </Button>
  );
}

export function CreateThreadsForm() {
  const [state, formAction] = useActionState(createThread, initialState);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (state?.error) {
      toast.error('Gagal Membuat Diskusi', {
        description: state.error,
      });
    }
  }, [state]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" className="mb-5" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Diskusi
          </Link>
        </Button>

        <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Buat Diskusi Baru
          </h1>
          <p className="text-muted-foreground mb-8">
            Bagikan pertanyaan atau topik akademik Anda dengan komunitas.
          </p>

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Apa pertanyaan atau judul diskusi Anda?"
                className="text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten *</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Jelaskan detail diskusi Anda di sini..."
                className="min-h-[200px] text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag-input">Tags</Label>
              <Input
                id="tag-input"
                placeholder="Tambahkan tag (tekan Enter untuk menambah)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="text-base"
              />
              <input type="hidden" name="tags" value={tags.join(',')} />

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} &times;
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <SubmitButton />
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                asChild
              >
                <Link href="/">Batal</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
