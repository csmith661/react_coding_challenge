import { useCallback } from "react";
import { useBookListContext } from "../hooks/useBookListContext";
import { SavedBook } from "../types/books";
import dayjs from "dayjs";

export function BookFilter(){


    const {bookList, setBookList} = useBookListContext()

    const options = ['order added', 'ascending', 'descending']

    const sortByTitleAscending = useCallback((a: SavedBook, b: SavedBook) => {
     const titleA = a.title.toLowerCase();
     const titleB = b.title.toLowerCase();
   
     if (titleA < titleB) {
       return -1;
     }
     if (titleA > titleB) {
       return 1;
     }
     return 0;
   }, []);
 
   const sortByTitleDescending = useCallback((a: SavedBook, b: SavedBook) => {
     const titleA = a.title.toLowerCase();
     const titleB = b.title.toLowerCase();
   
     if (titleA > titleB) {
       return -1;
     }
     if (titleA < titleB) {
       return 1;
     }
     return 0;
   }, []);

   const sortByAddedDateAscending = useCallback((a: SavedBook, b: SavedBook) => {
    const dateA = dayjs(a.dateAdded);
    const dateB = dayjs(b.dateAdded);

    console.log(dateA)
  
    if (dateA.isBefore(dateB)) {
      return -1;
    }
    if (dateA.isAfter(dateB)) {
      return 1;
    }
    return 0;
  }, []);
 

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        
        if(selectedValue === 'ascending'){
            const sortedArray = bookList.slice().sort(sortByTitleAscending);

             setBookList([...sortedArray])
        }
        if(selectedValue === 'descending'){
            const sortedArray = bookList.slice().sort(sortByTitleDescending);

             setBookList([...sortedArray])
        }
        if(selectedValue === 'order added'){
            const sortedArray = bookList.slice().sort(sortByAddedDateAscending);

             setBookList([...sortedArray])
        }
        };
    
      return (
        <div className="h-10 w-full text-xs text-right px-6 md:px-24 lg:px-48">
          <label className="px-8 py-2">Sort order</label><br></br>
          <select className="border rounded-md" onChange={handleSelectChange}>
            <option value="">Select...</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );


}