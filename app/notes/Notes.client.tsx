"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { MouseEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./Notes.module.css";

const NOTES_PER_PAGE = 12;

interface NotesClientProps {
  tag?: NoteTag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string): void => {
    setPage(1);
    setSearchQuery(value.trim());
  }, 500);

  const notesQuery = useQuery({
    queryKey: ["notes", page, searchQuery, tag ?? "all"],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: NOTES_PER_PAGE,
        search: searchQuery,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleOpenModal = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const notes = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;
  const queryError =
    notesQuery.error instanceof Error
      ? notesQuery.error.message
      : "Failed to load notes";

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onPageChange={setPage}
          />
        )}
        <button type="button" className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      {notesQuery.isLoading && <p>Loading, please wait...</p>}
      {notesQuery.isError && <p>Error: {queryError}</p>}
      {notesQuery.isFetching && !notesQuery.isLoading && (
        <p>Updating notes...</p>
      )}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </main>
  );
};

export default NotesClient;
