import { useBookListContext } from "../hooks/useBookListContext"
import { useEditPageContext } from "../hooks/useEditingPageContext"
import { BookListItem } from "./BookListItem"


export function BookList(){
   const {bookList, } = useBookListContext()

   const { setActive, setRelevantBook} = useEditPageContext()



   
   return(      
    <>
    
      <main className="h-[80vh] overflow-y-scroll w-screen list-none  py-4  z-10">
        {bookList.map((book, index)=>{
          return (
          <div className=" w-full h-48 flex justify-center my-6" key={index} onClick={()=>{ setRelevantBook(book), setActive(true)}}>
            <BookListItem book={book} />
          </div>)
        })}
        
      </main>

      </>
      )
}