const loki = require('lokijs');

var db = new loki("quickstart.db", {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});

const dbName = "users";

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
    var entries = db.getCollection("users");
    if (entries === null) {
        entries = db.addCollection("users");

        // users.insert({ name: 'odin', age: 50 });
        users.insert({ name: 'thor', age: 35 });
    }

    // kick off any program logic or start listening to external events
    runProgramLogic();
}

// example method with any bootstrap logic to run after database initialized
function runProgramLogic() {
    var entryCount = db.getCollection("users").count();
    console.log("number of entries in database : " + entryCount);

    var users = db.getCollection("users");
    var result = users.find({ age: { $lte: 35 } });
    // dumps array with 1 doc (thor) to console
    console.log(result);
    db.close();
}
