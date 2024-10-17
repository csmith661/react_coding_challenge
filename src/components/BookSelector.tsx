import dayjs from 'dayjs'
import { useCallback, useRef, useState } from "react"
import { useEditPageContext } from "../hooks/useEditingPageContext"
import { useGetOpenLibraryBook } from "../hooks/useGetOpenLibraryBook"
import { LoadingSpinner } from './LoadingSpinner'


export function BookSelector(){
    const {fetchOpenLibraryBookByOLID} = useGetOpenLibraryBook()

    const { setRelevantBook, setActive,} = useEditPageContext()

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const fetchAndDisplayEditing = useCallback(async (OLID: string)=>{
         const response = await fetchOpenLibraryBookByOLID(OLID)

         if(response.error){
            setErrorMessage(response.error)
         }
         if(response.data){
            setRelevantBook({...response.data, dateAdded: dayjs().toString(), description: ""})
            setActive(true)
            if(errorMessage){
                setErrorMessage(null)
            }
         }

         return response
    
    }, [errorMessage, fetchOpenLibraryBookByOLID, setActive, setRelevantBook])



    return(
        <section className="text-xs p-4 w-[75vw] z-10">
            <p className="md:px-20 lg:px-36">Add a book by Open Library Id Number {"(M or W)"}</p>
            {errorMessage && <p className="text-red-500 md:px-20 lg:px-36"> {errorMessage} </p>}
            <div className="flex items-center justify-center gap-6">
            <input className="w-4/6 md:h-10 text-lg border my-2 text-center rounded-md" type="text" placeholder="OLID" ref={inputRef} >
            </input>
            <button className="w-1/6 md:h-10 border rounded-md" onClick={async()=> {
                setLoading(true)
                const results = await fetchAndDisplayEditing(inputRef?.current?.value ?? "")
                if(results){
                    setLoading(false)
                }
                }}>Add</button>
            {loading && <><LoadingSpinner/></>}
            </div>

            
        </section>
    )
}