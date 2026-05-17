"use client";

import css from "../../../status.module.css";

interface FilteredNotesErrorProps {
  error: Error;
}

const FilteredNotesError = ({ error }: FilteredNotesErrorProps) => {
  return (
    <p className={css.message}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
};

export default FilteredNotesError;
