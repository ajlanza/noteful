import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError';
import FormError from '../FormError/FormError';
import PropTypes from 'prop-types';

export default class AddNote extends Component {
    static contextType = NotefulContext;
    state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
    }

    updateName(name) {
      this.setState({name: {value: name, touched: true }});
    }
    
    updateContent(content) {
      this.setState({content: {value: content, touched: true }})
    }

    validateName() {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return 'Name is required.';
      } else if (name.length > 10) {
          return 'Name can be no more than 10 characters long.';
      }
    }

    validateContent() {
      const content = this.state.content.value;
      if (content.length === 0) {
        return 'Content is required.';
      } else if(content.length > 500) {
          return 'Content can be no more than 500 characters long.';
      }
    }

    handleSubmit = e =>{
      e.preventDefault()
      e.persist()
      //get all the information from the form
      const noteContent = e.target.noteContent.value;
      const noteName = e.target.noteName.value;
      const folderId = e.target.folderSelection.value;
      //get time form is submitted
      const curTime = new Date().toLocaleString();
      //set all info to be added
      const addNote = {
        name: noteName,
        modified: curTime,
        folderId: folderId,
        content: noteContent,
      }
      //add the note via post
      fetch('http://localhost:9090/notes', {
        method: 'POST',
        body: JSON.stringify(addNote),
        headers: {
          'content-type': 'application/json',
        }
      })
      .then (res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        e.target.noteName.value = ' '
        this.context.addNote(data)
        this.props.history.push('/')
      })
      .catch(error => {
        alert(error.message)
        this.props.history.push('/')
      })
    }
  
    render() {
      const { folders=[] } = this.context;
      const nameError = this.validateName();
      const contentError = this.validateContent();
      
      return(
        <div>
          <FormError>
          <form className='AddNote' onSubmit={this.handleSubmit}>
            <label htmlFor='folderSelection'>Select a folder: </label>
            <select name='folderSelection' id='folderSelection'>
              {/* Map folders for each folder value */}
              {folders.map(folder => 
                <option name='optionName'key={folder.id} value={folder.id} id={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <br />
            {/* Name of Note */}
            <label htmlFor='noteName'>Name of note: </label>
            <input 
              type='text'
              name='noteName'
              id='noteName'
              placeholder='Note Name'
              onChange={e => this.updateName(e.target.value)}
            />
            {this.state.name.touched && <ValidationError message={nameError} />}
            <br />
            {/* Note Content */}
            <label htmlFor='noteContent'>Note Content: </label>
            <textarea
              rows='4'
              name='noteContent'
              id='noteContent'
              placeholder='Note Content'
              onChange={e => this.updateContent(e.target.value)}>
            </textarea> 
            {this.state.content.touched && <ValidationError message={contentError} />}
            <br />
            <button 
            type='submit' 
            disabled={this.validateName() || this.validateContent()}>
              Save Note
            </button>
          </form>
          </FormError>
        </div>
      );
    }
  }

  AddNote.propTypes ={
    history: PropTypes.object.isRequired
  }