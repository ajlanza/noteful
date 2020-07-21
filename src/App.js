import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import './App.css';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotefulContext from './NotefulContext';
import config from './config';

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };
    
    addFolder = folder => {
      this.setState({
        folders: [ ...this.state.folders, folder ],
      })
    }

    addNote = note => {
      this.setState({
        notes: [ ...this.state.notes, note ],
      })
  
    }
   
    handleDeleteNote = noteId => {
      this.setState({
        notes: this.state.notes.filter(note => note.id != noteId)
      });
    }

    componentDidMount() {
        //Get folders from API
        fetch(`${config.API_ENDPOINT}/api/folders`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(resFolders => {
            if (!resFolders.ok) {
              throw new Error(resFolders.status)
            }
            return resFolders.json()
          })
          .then(folders => {
            this.setState({folders});
          })
          .catch(error => this.setState({ error }))

          //Get notes from API
          fetch(`${config.API_ENDPOINT}/api/notes`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(resNotes => {
            if (!resNotes.ok) {
              throw new Error(resNotes.status)
            }
            return resNotes.json()
          })
          .then(notes => {
            this.setState({notes});
          })
          .catch(error => this.setState({ error }))
        }

    renderNavRoutes() {
        return (
            <>
                {['/', '/api/folders/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />          
                ))}
                <Route path="/api/notes/:note_id" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/api/folders/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/api/notes/:note_id" component ={NotePageMain} />
            </>
        );
    }

    render() {
        const contextValue = {
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.handleDeleteNote,
          addFolder: this.addFolder,
          addNote: this.addNote
        };


        return (
          <NotefulContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">
                  {this.renderNavRoutes()}
                </nav>        
                <header className="App__header">
                    <h1>
                      <Link to="/">Noteful</Link>{' '}
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
          </NotefulContext.Provider>  
        );
    }
}

export default App;