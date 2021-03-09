import * as SQLite from 'expo-sqlite';
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";

export default async function openDatabase() {
    // if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    //     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    // }
    // await FileSystem.downloadAsync(
    //     Asset.fromModule(require('./database.db')).uri,
    //     FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
    // );
    return SQLite.openDatabase('myDatabaseName.db');
}

let dropTables = false;

async function formatDatabase() {
    const db = await openDatabase();
    db.transaction(tx => {
        if (dropTables) {
            tx.executeSql('drop table if exists memory;');
            tx.executeSql('drop table if exists image;');
            tx.executeSql('drop table if exists tag;');
            tx.executeSql('drop table if exists "memory-image";');
            tx.executeSql('drop table if exists "memory-tag";');
        }
        tx.executeSql('create table if not exists "memory" ("id" integer primary key autoincrement, "title" text, "description" text);');
        tx.executeSql('create table if not exists "image" ("id" integer primary key autoincrement, "path" text);');
        tx.executeSql('create table if not exists "tag" ("id" integer primary key autoincrement, "tag" text unique);');
        tx.executeSql('create table if not exists "memory-image" ("id" integer primary key autoincrement, "memory" integer not null, "image" integer not null, foreign key("memory") references memory, foreign key("image") references image);');
        tx.executeSql('create table if not exists "memory-tag" ("id" integer primary key autoincrement, "memory" integer not null, "tag" integer not null, foreign key("memory") references memory, foreign key("tag") references tag);');
    })
}
formatDatabase().then(()=>{
    console.log('database formatted')
});

async function databaseTest() {
    const db = await openDatabase();

    db.transaction(tx => {
        tx.executeSql('insert into memory (title, description) VALUES (?,?)', ['test', 'test']);
        tx.executeSql('insert into image (path) values (?);', ['test']);
        tx.executeSql('insert into "tag" (tag) values (?);', ['test']);
        tx.executeSql("select * from memory", [], (_, result) => {
            console.log('success');
            console.log(result);
        }, (_, result) => {
            console.log('error');
            console.log(result);
        })
    })
}

// Add Jared's memories
async function addJared() {
    const db = await openDatabase();

    var data2 = [
        {
            id: '6',
            title: 'Stroller Ride',
            description: 'Today mom and dad took Isaac for a ride in the stroller for the first time. He had fun until he started to get a little cold, then he was upset.',
            images: [require('./screens/view_stack/temp_images/IMG_5576.jpg'), require('./screens/view_stack/temp_images/IMG_5576.jpg')],
            idx: 0,
            tags: [{tag:'Isaac', id: '3'}]
        },
        {
            id: '1',
            title: 'Happy Birthday',
            description: 'Isaac Jacob was born on January 29, 2021. He weighed 7lbs, 3oz and was 20 inches long',
            images: [require('./screens/view_stack/temp_images/IMG_5159.jpg'), require('./screens/view_stack/temp_images/IMG_5166.jpg')],
            idx: 0,
            tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
        },
        {
            id: '2',
            title: 'Funny Faces',
            description: 'Isaac just started wearing 0-3 month clothes and likes to make lots of funny faces.',
            images: [require('./screens/view_stack/temp_images/IMG_5205.jpg'), require('./screens/view_stack/temp_images/IMG_5196.jpg')],
            idx: 0,
            tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
        },
        {
            id: '3',
            title: 'Getting to know grandpa Castaneda',
            description: 'First day home and grandpa gets to meet his first grandson.',
            images: [require('./screens/view_stack/temp_images/IMG_5225.jpg'), require('./screens/view_stack/temp_images/IMG_5226.jpg')],
            idx: 0,
            tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
        },
        {
            id: '4',
            title: 'Same Birthday',
            description: 'Isaac and Ryder were born on the same day. We are good friends with their parents Kaleb and Mary and hope that these little guys will grow up to be great friends.',
            images: [require('./screens/view_stack/temp_images/IMG_5330.jpg'), require('./screens/view_stack/temp_images/IMG_5331.jpg')],
            idx: 0,
            tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
        },
        {
            id: '5',
            title: 'First Bath',
            description: 'Isaac had his first bath today. He pooped all over mommy and daddy, but it was nice for him to be clean.',
            images: [require('./screens/view_stack/temp_images/IMG_5496.jpg'), require('./screens/view_stack/temp_images/IMG_5497.jpg')],
            idx: 0,
            tags: [{tag:'tag1', id: '0'}, {tag: 'tag2', id: '1'}, {tag: 'tag3', id: '2'}, {tag:'Isaac', id: '3'}],
        },
    ];
    for (let i = 0; i < data2.length; i++) {
        db.transaction(tx => {
            let memoryId;
            tx.executeSql('insert into memory (title, description) VALUES (?,?);', [data2[i].title, data2[i].description], (_, result)=>{
                memoryId = result.insertId;
            });
            for (let j = 0; j < data2[i].images.length; j++) {
                tx.executeSql('insert into image (path) values (?);', [data2[i].images[j]], (_, result)=>{
                    tx.executeSql('insert into "memory-image" (image, memory) VALUES (?,?);', [result.insertId, memoryId]);
                })
            }
            for (let j = 0; j < data2[i].tags.length; j++) {
                tx.executeSql("select * from tag where lower(tag)=lower(?);", [data2[i].tags[j]], (tx, result) => {
                    if (result.rows.length === 0) {
                        // Tag doesn't exist, create it
                        tx.executeSql("insert into tag (tag) values (?);", [data2[i].tags[j]], () => {
                            tx.executeSql("select * from tag where lower(tag)=lower(?);", [data2[i].tags[j]], (tx, result) => {
                                // Connect tag with memory in memory-tag
                                let tagId = result.rows.item(0);
                                tx.executeSql('insert into "memory-tag" (memory, tag) values (?,?);', [memoryId, tagId]);
                            })
                        });
                    } else {
                        tx.executeSql("select * from tag where lower(tag)=lower(?);", [data2[i].tags[j]], (tx, result) => {
                            // Connect tag with memory in memory-tag
                            let tagId = result.rows.item(0);
                            tx.executeSql('insert into "memory-tag" (memory, tag) values (?,?);', [memoryId, tagId]);
                        })
                    }
                })
            }
        })
    }
}
if (false) {
    addJared().then();
}


if (false) {
    databaseTest().then(() => {
        console.log('complete');
    });
}