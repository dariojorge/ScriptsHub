import { DbEnumType } from "../models/db-enum-type";

const runners_id = (id: string) => {
    return DbEnumType.RUNNERS_PROFILE.replace("{ID}", id);
}

export const saveRunnerProfile = async (id: string, profile: RunnersProfileModel) => {
    return await window.electronAPI.dbInsert(runners_id(id), profile);
}

export const loadRunnerProfile = async (id: string): Promise<any> => {
    return await window.electronAPI.dbFindOne(runners_id(id));
}

export const loadRunnerProfiles = async (): Promise<any> => {
    return await window.electronAPI.dbGetAll(DbEnumType.RUNNERS_GENERIC_PROFILE);
}

export const removeProfilesById = async (id: string): Promise<any> => {
    return await window.electronAPI.dbRemoveOne(runners_id(id));
}

export const updateProfile = async (id: string, profile: RunnersProfileModel): Promise<any> => {
    return await window.electronAPI.dbUpdate(runners_id(id), profile);
}