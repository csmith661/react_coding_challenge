export type OpenLibraryBookM = Record<string, {
        info_url: string;
        thumbnail_url: string,
        details:{
            title: string;
            authors: AuthorInformationM[]
            subjects?: string[]
            publish_date: string,
            revision: number,
            works: {key:string}[]
        }
    }>
    

type AuthorInformationM = {
    key: string,
    name: string,
}

export type OpenLibraryBookW = {

    entries: {
        title: string,
        authors: AuthorInformationW[],
        publish_date: string,
        subjects: string[], 
        revision: number
    }[]
    
}

type AuthorInformationW = {
    key: string
}

export type EditableBook = {
    title: string;
    author: string,
    OLID: string,
    publish_date: string,
    subjects: string[],
    revision: number,

}

export interface SavedBook extends EditableBook {
    dateAdded: string,
    description: string,
}