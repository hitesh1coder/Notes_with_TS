import * as React from "react";
import { Note } from "../models/note.model";
import Notes from "./Notes";

interface INotesListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesList: React.FC<INotesListProps> = ({ notes, setNotes }) => {
  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    localStorage.setItem(
      "react-notes",
      JSON.stringify(notes.filter((note) => note.id !== id))
    );
  };
  return (
    <>
      <h2 className="mt-3">Notes</h2>

      {notes.map((note) => {
        return <Notes key={note.id} note={note} handleDelete={handleDelete} />;
      })}
    </>
  );
};

export default NotesList;
