import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note.model";

interface ICreateNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const CreateNoteModal: React.FunctionComponent<ICreateNoteProps> = ({
  notes,
  setNotes,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = React.useState<string>("");
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const textRef = React.useRef<HTMLTextAreaElement | null>(null);
  const colorRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (titleRef.current?.value === "" || textRef.current?.value === "") {
      return setError("All fields are mandatory");
    }
    setError("");
    setNotes([
      ...notes,
      {
        id: new Date().toString(),
        title: (titleRef.current as HTMLInputElement).value,
        text: (textRef.current as HTMLTextAreaElement).value,
        color: (colorRef.current as HTMLInputElement).value,
        date: new Date().toString(),
      },
    ]);
    localStorage.setItem(
      "react-notes",
      JSON.stringify([
        ...notes,
        {
          id: new Date().toString(),
          title: (titleRef.current as HTMLInputElement).value,
          text: (textRef.current as HTMLTextAreaElement).value,
          color: (colorRef.current as HTMLInputElement).value,
          date: new Date().toString(),
        },
      ])
    );
    title: (titleRef.current as HTMLInputElement).value = "";
    text: (textRef.current as HTMLTextAreaElement).value = "";
    handleClose();
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginTop: "2rem" }}
      >
        Create New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="mb-3 mt-3" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                ref={titleRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Note Text"
                as="textarea"
                rows={3}
                ref={textRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="colorInput">Color</Form.Label>
              <Form.Control
                type="color"
                id="colorInput"
                defaultValue="#dfdfdf"
                title="Choose Color"
                ref={colorRef}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateNoteModal;
