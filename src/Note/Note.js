import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = NotefulContext;
  
  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.note_id
    
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return true
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, note_id, modified } = this.props
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/api/notes/${note_id}`}>
          {name}
        </Link>
      </h2>
      <button 
        className='Note__delete' 
        type='button'
        onClick={this.handleClickDelete}>
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
              {modified}
          </span>
        </div>
      </div>
    </div>
  )}
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  note_id: PropTypes.number.isRequired,
  modified: PropTypes.string.isRequired
}