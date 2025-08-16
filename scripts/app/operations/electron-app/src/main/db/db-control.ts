import { database } from "./db";

const enum AppEnumType {
    APPLICATION_NAME = "name-of-the-application"
}

export const findOne = (id: string): Promise<any> => {
    return new Promise<string>((resolve, reject) => {
        database.findOne({ _id: id }, (_err: Error | null, doc: any) => {
            if (doc === undefined || doc === null) {
                console.warn('[' + AppEnumType.APPLICATION_NAME + ']', "This key \"" + id + "\" does not exist");
                return reject();
            }

            return resolve(doc);
        });
    });
}

export const updateData = (id: string, data: any) => {
    database.update({ _id: id }, { $set: { data } }, {}, (err: any) => {
        if (err) {
            console.error('[' + AppEnumType.APPLICATION_NAME + ']', ' cannot add data in db', err);
        }
    });
}

export const insert = (id: string, data: any) => {
    database.insert({ _id: id, data }, (err: any) => {
        if (err) {
            console.warn('[' + AppEnumType.APPLICATION_NAME + ']', " Can't insert key \"" + id + "\" as it exists, updating instead");
            updateData(id, data);
        }
    });
}

export const getAll = (id: string): Promise<any> => {
    return new Promise<string>((resolve, reject) => {
        const regex = new RegExp(id);
        database.find({ _id: regex }, (_err: Error | null, doc: any) => {
            if (doc === undefined || doc === null) {
                console.warn('[' + AppEnumType.APPLICATION_NAME + ']', "This key \"" + id + "\" does not exist");
                return reject();
            }

            return resolve(doc);
        });
    });
}

export const removeOne = (id: string): Promise<any> => {
    return new Promise<number>(async (resolve, reject) => {
        try {
            const numRemoved = await database.removeAsync({ _id: id }, {});
            console.log('[' + AppEnumType.APPLICATION_NAME + ']', `Removed ${numRemoved} document(s) from the id ${id}`);
            resolve(numRemoved);
        } catch (error) {
            console.warn('[' + AppEnumType.APPLICATION_NAME + ']', 'Error removing document:', error);
            reject();
        }
    });
}