import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from './NoteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import './App.css';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import NotefulContext from './NotefulContext';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        // folderTouched: false
    };
    
    addFolder = folder => {
      this.setState({
        folders: [ ...this.state.folders, folder ],
      })
    }
    //  updateFolder = folder => {
    //    this.setState({
    //      folderTouched: true
    //    })
    //    console.log(this.state.folderTouched);
    //    console.log(folder, folder.length);
    //    if (folder.length === 0){
    //      console.log('folder lenggth is 0');
    //      this.setState({
    //        folderTouched: false
    //      })
    //    }
    //  }
    // validateFolder = folder => {
    //   console.log(folder);
    // }

    addNote = note => {
      this.setState({
        notes: [ ...this.state.notes, note ],
      })
    }
   
    handleDeleteNote = noteId => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      });
    }

    componentDidMount() {
        //Get folders from API
        fetch('http://localhost:9090/folders', {
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
          fetch('http://localhost:9090/notes', {
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
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />          
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component ={NotePageMain} />
            </>
        );
    }

    render() {
        const contextValue = {
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.handleDeleteNote,
          addFolder: this.addFolder,
          // updateFolder: this.updateFolder,
          // folderTouched: this.state.folderTouched,
          // validateFolder: this.validateFolder,
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
                        {/* <FontAwesomeIcon icon="check-double" /> */}
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
          </NotefulContext.Provider>  
        );
    }
}

export default App;