import { useContext } from "react"
import { EditPageContext } from "../contexts/contextDeclerations"

export function useEditPageContext(){
    const context = useContext(EditPageContext)
    if(!context) throw new Error('This must be used in a EditPageProvider')

    return context
}