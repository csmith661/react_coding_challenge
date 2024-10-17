import { SavedBook } from "../types/books";

export function BookListItem(props: {book: SavedBook}){
    const {book} = props
    

    
    return(
        <section className="border-2 rounded-md relative overflow-hidden h-full w-5/6">
            <div className="flex w-full px-4 py-2 md:p-6 justify-between flex-wrap place-content-between">
            <h2 className="md:text-lg font-bold">{book.title} <span className="font-normal">({trimDate(book.publish_date)})</span></h2>
            <aside className="italic">{book.author}</aside>
            </div>

            <p className="italic px-4">{book.description}</p>

        </section>
    )

}

//trim the date but look to see if it is one of the OneLibrary ? dates, if so include the ?
function trimDate(arg: string){
    if(arg[arg.length-1] === '?'){
        return arg.slice((arg.length-5))
    }
    return arg.slice((arg.length-4))
}