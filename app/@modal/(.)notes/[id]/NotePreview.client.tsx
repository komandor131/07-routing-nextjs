"use client";

import NotePreview from "@/components/NotePreview/NotePreview";
import type { Note } from "@/types/note";

interface NotePreviewClientProps {
  noteId: Note["id"];
}

const NotePreviewClient = ({ noteId }: NotePreviewClientProps) => {
  return <NotePreview noteId={noteId} />;
};

export default NotePreviewClient;
