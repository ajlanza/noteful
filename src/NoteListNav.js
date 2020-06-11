import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import CircleButton from './CircleButton'
import './NoteListNav.css'
import NotefulContext from './NotefulContext'

export default class NoteListNav extends Component {
  static contextType = NotefulContext;
  render() {
    const { folders=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            Add
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}

