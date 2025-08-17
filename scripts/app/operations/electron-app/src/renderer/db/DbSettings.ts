import { DbEnumType } from "../models/db-enum-type";

export const saveTheme = async (theme: string) => {
    return await window.electronAPI.dbInsert(DbEnumType.THEME, theme);
}

export const loadTheme = async (): Promise<any> => {
    return await window.electronAPI.dbFindOne(DbEnumType.THEME);
}