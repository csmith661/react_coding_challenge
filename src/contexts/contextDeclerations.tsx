import { Dispatch, SetStateAction, createContext } from "react"

import { SavedBook } from "../types/books"

//vite likes to have contexts seperately declared to enjoy the benefits of hot refresh

export type BookContextType = {
    bookList: SavedBook[]
    setBookList: Dispatch<SetStateAction<SavedBook[]>>,
    staleData: boolean,
    setStaleData:  Dispatch<SetStateAction<boolean>>
    
}

export const BookContext = createContext<BookContextType | null>(null)


export type EditPageContextType = {
    validOLID: boolean,
    setValidOLID: Dispatch<SetStateAction<boolean>>,
    relevantBook: SavedBook | null,
    setRelevantBook: Dispatch<SetStateAction< SavedBook | null>>
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    
}

export const EditPageContext = createContext<EditPageContextType | null>(null)