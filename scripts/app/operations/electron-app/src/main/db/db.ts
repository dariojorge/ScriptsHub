import Datastore from '@seald-io/nedb';

const databaseInternal = new Datastore({filename: 'app.db', autoload: true, corruptAlertThreshold: 0.9, inMemoryOnly: false});

export const database = databaseInternal;
