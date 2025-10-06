'use client';

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import React, { useState } from "react";
import Link from "next/link";

export function CreateThreads() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Error",{
        description: "Please fill in all required fields",
      });
      return;
    }
    toast.success("Success",{
      description: "Your topic has been created successfully",
    });
    
    //redirect
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          className="mb-5"
          asChild
        >
          <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discussions</Link>
        </Button>

        <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create New Discussion
          </h1>
          <p className="text-muted-foreground mb-8">
            Share your academic question or topic with the community
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="What's your question or topic?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Provide details about your discussion..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="text-base"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 sm:flex-none">
                Create Discussion
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                asChild
              >
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
