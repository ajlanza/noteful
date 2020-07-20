import React, { Component } from 'react';
import Note from '../Note/Note';
import './NotePageMain.css';
import { findNote } from '../notes-helpers';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

export default class NotePageMain extends Component {
  static defaultProps = {
    match: { 
      params: {}
    }
  }
  static contextType = NotefulContext

  handleDeleteNote = note_id => {
    this.props.history.push('/')
  }

  render() {
    const { notes=[] } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || { content: ''}
  return (
    <section className='NotePageMain'>note page main
      <Note
        note_id={note.id}
        name={note.name}
        modified={note.date_modified}
        onDeleteNote={this.handleDeleteNote}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )}
}

NotePageMain.propTypes = {
  match: PropTypes.object.isRequired
}