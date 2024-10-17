import { useContext } from "react"
import { BookContext } from "../contexts/contextDeclerations"

export function useBookListContext(){
    const context = useContext(BookContext)
    if(!context) throw new Error('This must be used in a BookContextProvider')

    return context
}