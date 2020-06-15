import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListMain.css';
import NotefulContext from '../NotefulContext';
import { getNotesForFolder } from '../notes-helpers';
import PropTypes from 'prop-types';

export default class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext
  
  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolders = getNotesForFolder(notes, folderId)

  return (
    <section className='NoteListMain'>
      <ul>
        {notesForFolders.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          Add
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )}
}

NoteListMain.propTypes = {
  match: PropTypes.object.isRequired
}