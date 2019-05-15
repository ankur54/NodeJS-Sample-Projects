const yargs = require("yargs");
const chalk = require("chalk");

const notesUtil = require("./notes.js");

console.log(notesUtil.getnotes());

// console.log(process.argv);
yargs.version('1.2.0');

yargs.command({
    command: 'add',
    describe: 'This option is to add notes',
    builder: {
        title: {
            describe: 'The title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'The body of the note that describe it',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Adding notes: ' + argv.title);        
        console.log('Notes body: ' + argv.body);  
        notesUtil.addnotes(argv.title, argv.body);
    }
});


yargs.command({
    command: 'remove',
    describe: 'This command is to remove a note from the group of notes',
    builder: {
        title: {
            describe: 'Specify the title of notes you wanna delete',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Title you wanna delete: ' + argv.title);
        notesUtil.deletenote(argv.title);
    }
})


yargs.command({
    command: 'list',
    describe: 'This command is to list all the notes...',
    handler() {
        console.log('Notes list: ');
        notesUtil.listnotes();
    }
})


yargs.command({
    command: 'read',
    describe: 'This command is to read a note from the group of notes',
    builder: {
        title: {
            describe: 'Specify the title of notes you wanna read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('Title you wanna read: ' + chalk.blue(argv.title));
        notesUtil.readnote(argv.title);
    }
})

yargs.parse();
// console.log(yargs.argv);