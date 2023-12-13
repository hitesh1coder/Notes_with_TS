import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Note } from "./models/note.model";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import NotesList from "./components/NotesLists";
import CreateNoteModal from "./components/CreateNoteModal";

function App() {
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem("react-notes") || "[]")
  );

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col>
            <CreateNoteModal notes={notes} setNotes={setNotes} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NotesList notes={notes} setNotes={setNotes} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
