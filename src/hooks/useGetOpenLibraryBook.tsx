
import axios from 'axios'
import { EditableBook, OpenLibraryBookM, OpenLibraryBookW } from "../types/books"
import { useCallback } from 'react'

export function useGetOpenLibraryBook(){

    const fetchOpenLibraryBookByOLID = useCallback(async (OLID: string): Promise<{data: EditableBook | null, error: string | null}>=>{
        try{
        
        const olidType = getOLIDType(OLID)

        //sort between the W or M keys and synthesize to a EditableBook

        //returns invalid if there is no M or W

        if (olidType === 'W'){

            const fetchUrl = getOpenLibraryWUrl(OLID)
            const rawBooks = await axios.get<OpenLibraryBookW>(fetchUrl).then((response)=>response.data)
            const rawBook = rawBooks.entries[0]
    
            const authorKey = rawBook.authors[0].key
    
            const authorOLID = extractOLIDFromKey(authorKey)

            const authorName = await axios.get<{name: string}>(`https://openlibrary.org/authors/${authorOLID}.json`).then((response)=>response.data)

            return {data: {
                title: rawBook.title,
                author: authorName.name,
                publish_date: rawBook.publish_date,
                revision: rawBook.revision,
                OLID: OLID,
                subjects: rawBook.subjects, 

            }, 
            error: null,
        }
        }

        if (olidType === 'M'){

            const fetchUrl = getOpenLibraryMUrl(OLID)
            const rawMBook = await axios.get<OpenLibraryBookM>(fetchUrl).then((response)=>response.data)
            const wBookDetails = rawMBook[`OLID:${OLID}`].details

            //we need to fetch the author's name real quick, so grab the proper W key and any relevant info
            const wBookDetailsKey = wBookDetails.works[0].key

            const wFetchOLID = extractOLIDFromKey(wBookDetailsKey)
            const wFetchUrl = getOpenLibraryWUrl(wFetchOLID)
            const rawBooks = await axios.get<OpenLibraryBookW>(wFetchUrl).then((response)=>response.data)
            const rawWBookInfo = rawBooks.entries[0]

            return {
                data: {

                    title: rawWBookInfo.title,
                    author: wBookDetails.authors[0].name,
                    publish_date: wBookDetails.publish_date,
                    revision: wBookDetails.revision,
                    OLID: OLID,
                    subjects: rawWBookInfo.subjects,
                },
                error: null

            }

        }

        return {data: null, error: ('Invalid OLID Submitted, Please Try Again')}
    }
    catch{
        return {data: null, error: ('OLID Does Not Exist, Please Try Again')}
    }


    }, [])


    return {
        fetchOpenLibraryBookByOLID
    }

}


function getOpenLibraryMUrl(openLibraryOLID: string){
    const openLibraryWorksUrl = 'https://openlibrary.org/api/books?&bibkeys=OLID:'
    const closingTag = '&jscmd=details&format=json'

    return openLibraryWorksUrl + openLibraryOLID + closingTag
}

function getOpenLibraryWUrl(openLibraryOLID: string){
    const openLibraryWorksUrl = 'https://openlibrary.org/works/'
    const closingTag = '/editions.json'

    return openLibraryWorksUrl + openLibraryOLID + closingTag
}

export function extractOLIDFromKey(key: string){
    const splitString = key.split('/')
    return splitString[2]
}

export function getOLIDType(openLibraryOLID: string){
    return openLibraryOLID[openLibraryOLID.length-1]
}