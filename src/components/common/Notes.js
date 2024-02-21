import React, { useState } from 'react';
import Button from './Button.js';
import Textarea from './Textarea.js';
import * as Icons from 'react-icons/tb';

const Notes = ({ placeholder, label, small }) => {
  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);

  const handleInputChange = (value) => {
    setNote(value);
  };

  const handleAddNote = () => {
    if (note.trim() !== '') {
      const newNote = {
        content: note,
        date: new Date().toLocaleString(),
      };
      setNoteList([...noteList, newNote]);
      setNote('');
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNoteList = [...noteList];
    updatedNoteList.splice(index, 1);
    setNoteList(updatedNoteList);
  };

  return (
    <>
      <div className="notes">
        <div className="valid_field">
          <Textarea placeholder={placeholder} value={note} onChange={(value) => handleInputChange(value)} />
          <small>{small}</small>
          <Button label={label} className="sm" onClick={handleAddNote} />
        </div>
        {noteList.length !== 0 ? (
          <div className="note_list">
            {noteList.length !== 0 ? <h2 className="sub_2_heading">note list</h2> : ''}
            {noteList.map((noteItem, index) => (
              <div className="note" key={index}>
                <p>{noteItem.content}</p>
                <div className="note_footer">
                  <span className="note_date">{noteItem.date}</span>
                  <Icons.TbTrash onClick={() => handleDeleteNote(index)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Notes;
