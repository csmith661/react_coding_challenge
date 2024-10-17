import { ReactNode, useState } from "react"
import { SavedBook } from "../types/books"
import { EditPageContext } from "./contextDeclerations"

export function EditPageContextProvider(props:{children: ReactNode}){


    const [validOLID, setValidOLID] = useState(false)

    const [relevantBook, setRelevantBook] = useState<SavedBook | null>(null)

    const [active, setActive] = useState<boolean>(false)

    
  

    return(
        <EditPageContext.Provider value={{validOLID, setValidOLID, setRelevantBook, relevantBook, active, setActive}}>
            {props.children}
        </EditPageContext.Provider>
    )
}
