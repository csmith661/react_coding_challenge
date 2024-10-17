import { ReactNode, useEffect, useState } from "react"
import { useLocalStorageOperations } from "../hooks/useLocalStorageOperations"
import { SavedBook } from "../types/books"
import { BookContext } from "./contextDeclerations"

export function BookContextProvider(props:{children: ReactNode}){

    const [bookList, setBookList] = useState<SavedBook[]>([])
    const [staleData, setStaleData] = useState<boolean>(true)

    
  const {listBooksFromLocalStorage} = useLocalStorageOperations()

  //when stale, refresh
    useEffect(()=>{
        if(staleData){
            const savedBooks = listBooksFromLocalStorage()
            setBookList([...savedBooks])
            setStaleData(false)
        }
    }, [listBooksFromLocalStorage, setBookList, staleData])
  
    console.log(bookList)
  

    return(
        <BookContext.Provider value={{bookList, staleData, setBookList, setStaleData}}>
            {props.children}
        </BookContext.Provider>
    )
}
