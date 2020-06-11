import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NotefulContext from './NotefulContext'

export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = NotefulContext;
  
  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'applicatioon/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
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
    const { name, id, modified } = this.props
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button 
        className='Note__delete' 
        type='button'
        onClick={this.handleClickDelete}>
        {/* <FontAwesomeIcon icon='trash-alt' /> */}
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {/* {format( */}
              {modified}
              {/* , 'Do MMM YYYY')} */}
          </span>
        </div>
      </div>
    </div>
  )}
}