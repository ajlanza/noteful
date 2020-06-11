import React, { Component }from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from './Note'
import CircleButton from './CircleButton'
import './NoteListMain.css'
import NotefulContext from './NotefulContext'
import { getNotesForFolder } from './notes-helpers'

export default class NoteListMain extends Component {
  static defaulProps = {
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
          {/* <FontAwesomeIcon icon='plus' /> */}Add
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )}
}