"use client";

import css from "../../status.module.css";

interface NoteDetailsErrorProps {
  error: Error;
}

const NoteDetailsError = ({ error }: NoteDetailsErrorProps) => {
  return (
    <p className={css.message}>Could not fetch note details. {error.message}</p>
  );
};

export default NoteDetailsError;
