const enum DbEnumType {
    SAVE_TAB_ID = "SAVE_TAB_ID"
}

export const saveTab = async (activeTab: string) => {
    return await window.electronAPI.dbInsert(DbEnumType.SAVE_TAB_ID, activeTab);
}

export const loadTab = async (): Promise<any> => {
    return await window.electronAPI.dbFindOne(DbEnumType.SAVE_TAB_ID);
}