  
import React from 'react';
import CircleButton from '../CircleButton/CircleButton';
import NotefulContext from '../NotefulContext';
import { findNote, findFolder } from '../notes-helpers';
import './NotePageNav.css';
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;

  render() {
    const { notes, folders, } = this.context
    const { note_id } = this.props.match.params
    const note = findNote(notes, note_id) || {}
  
    const folder = findFolder(folders, note.folder)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes ={
  match: PropTypes.object.isRequired
}