import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    addFolder: () => {},
    // updateFolder: () => {},
    // folderTouched: Boolean,
    // validateFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
})

export default NotefulContext