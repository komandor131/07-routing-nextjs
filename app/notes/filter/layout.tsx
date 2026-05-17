import type { ReactNode } from "react";

import css from "./LayoutNotes.module.css";

interface NotesFilterLayoutProps {
  children: ReactNode;
  modal: ReactNode;
  sidebar: ReactNode;
}

const NotesFilterLayout = ({
  children,
  modal,
  sidebar,
}: NotesFilterLayoutProps) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notesWrapper}>{children}</section>
      {modal}
    </div>
  );
};

export default NotesFilterLayout;
