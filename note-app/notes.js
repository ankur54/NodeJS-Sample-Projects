const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Note taking...";
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    // console.log(notes);

    const check = notes.filter(note => note.title.toLowerCase() === title.toLowerCase());
    // console.log(check);

    if (check.length === 0) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added...'));
    } else {
        console.log(chalk.red.inverse('Title already present. Please change the title and try again...!!!!'));
    }
}


const deleteNote = title => {
    const notes = loadNotes();

    const idx = notes.findIndex(note => note.title.toLowerCase() === title.toLowerCase());
    if(idx === -1)
        console.log(chalk.red.inverse('Note not found'));
    else {
        notes.splice(idx, 1);
        console.log(chalk.green.inverse('notes deleted'));
    }

    saveNotes(notes);
}


const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.blue(note.title));
    });
}


const readNotes = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title.toLowerCase() === title.toLowerCase());

    if(note) {
        console.log(chalk.green.inverse('note:'));
        console.log(chalk.blue(note.title) + " " + note.body);
    } else console.log(chalk.red.inverse('note not found'));
}


const saveNotes = data => {
    fs.writeFileSync('data.JSON', JSON.stringify(data));
}

const loadNotes = () => {
    try {
        const data = fs.readFileSync('data.JSON').toString();
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getnotes: getNotes,
    addnotes: addNotes,
    deletenote: deleteNote,
    listnotes: listNotes,
    readnote: readNotes
}