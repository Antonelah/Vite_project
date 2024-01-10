import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AddTodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("");
  const inputRef = useRef(null); // to reference a value not needed for rendering and also if you want to access directly an HTML DOM element and call functions on those elements

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAddTodoClick = (event) => {
    event.preventDefault();

    if (!newItem || !newItem.trim()) {
      return;
    }

    addTodo(newItem);
    setNewItem("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Form>
      <InputGroup size="lg">
        <Form.Control
          placeholder="Add todo"
          onChange={handleChange}
          value={newItem}
          autoFocus
          ref={inputRef}
        />

          <Button
            variant="outline-secondary"
            onClick={handleAddTodoClick}
            type="submit"
          >
            Add
          </Button>
      </InputGroup>
    </Form>
  );
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func,
};

export default AddTodoForm;

/*inputRef je inicijaliziran na null jer će se kasnije koristiti kao referenca na DOM element koji još nije stvoren u trenutku inicijalizacije komponente. Kada koristite useRef kako biste stvorili referencu na neki DOM element, početna vrijednost obično nije bitna, jer će se ta referenca popuniti nakon što se taj element stvori u DOM-u.

U ovom slučaju, inputRef se koristi kao referenca na Form.Control element, koji predstavlja unos za unos novih todo stavki. Nakon što se komponenta montira i Form.Control stvori u DOM-u, inputRef će sadržavati referencu na taj DOM element, omogućavajući vam da izvodite operacije na tom elementu, kao što je postavljanje fokusa, bez potrebe za promjenom stanja komponente i ponovnim renderiranjem.

Da bi inputRef poprimio vrijednost input polja, koristi se ref atribut u JSX-u:

Kada se ovako postavi ref={inputRef}, nakon što se Form.Control stvori u DOM-u, inputRef će referencirati taj DOM element. S obzirom na tu referencu, možete pristupiti svojstvima i metodama tog DOM elementa, kao što je focus() kako biste postavili fokus na to polje, što je ono što se radi u handleAddTodoClick funkciji.*/