import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError';
import FormError from '../FormError/FormError';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
  static contextType = NotefulContext;
  state = {
    newFolder: '',
    touched: false
  }

  updateFolder = newFolder => {
    this.setState({
      newFolder: newFolder,
      touched: true
    })
  }

  validateNewFolder() {
    const newFolder = this.state.newFolder;
    if(newFolder.length === 0) {
      return 'Folder name required.';
    } else if(newFolder.length > 15) {
      return 'Folder name can not be more than 15 characters long.';
    }
  }

  handleSubmit = e =>{
    e.preventDefault()
    e.persist()
    //get the folder name from the form
    const folderName = e.target.folderName.value
    const addFolderName = {
      name: folderName
    }
    //add the folder name via post
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      body: JSON.stringify(addFolderName),
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
      e.target.folderName.value = ' '
      this.context.addFolder(data)
      this.props.history.push('/')
    })
    .catch(error => {
      alert(error.message)
      this.props.history.push('/')
    })
  }

  render() {
    const newFolderError = this.validateNewFolder();
    return(
      <div>
        <FormError>
        <form className='AddFolder' onSubmit={this.handleSubmit}>
          <label htmlFor='folderName'>
            Folder Name
          </label>
          <input 
            type='text'
            name='folderName'
            id='folderName'
            placeholder='Folder Name'
            onChange={e => this.updateFolder(e.target.value)}
          />
          {this.state.touched && <ValidationError message={newFolderError} />}
          {' '}
          <button type='submit' disabled={this.validateNewFolder() }>
            Save
          </button>
        </form>
        </FormError>
      </div>
    );
  }
}

AddFolder.propTypes ={
  history: PropTypes.object.isRequired
}