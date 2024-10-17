import { useCallback } from "react";
import { SavedBook } from "../types/books";

export function useLocalStorageOperations(){



    const saveBookToLocalStorage = useCallback((bookObject: SavedBook)=>{
            const stringifiedBookObject = JSON.stringify(bookObject)
            localStorage.setItem(`book-${bookObject.OLID}`, stringifiedBookObject)
    }, [])

    const getBookFromLocalStorage = useCallback((OLID: string)=>{
        return localStorage.getItem(OLID)
    }, [])

    const listBooksFromLocalStorage = useCallback(()=>{
        const databaseLength = localStorage.length
        const newBookArray: SavedBook[] = []

        //iterate through local storage keys, get the necessary OLID and push it to the book array
        //this ignores any local storage styles
        for (let i = 0; i < databaseLength; i++){
            const bookOLID = localStorage.key(i)            
            if(!bookOLID?.includes('book-')) continue
            const stringifiedBook = getBookFromLocalStorage(bookOLID ?? '')
            if(!stringifiedBook) continue
            const parsedObject = JSON.parse(stringifiedBook)
            newBookArray.push(parsedObject)
        }
        return newBookArray
    }, [getBookFromLocalStorage])


   

    return{

        saveBookToLocalStorage,
        getBookFromLocalStorage,

        listBooksFromLocalStorage
    }
}