import { useCallback, useEffect, useState } from "react";
import { useBookListContext } from "../hooks/useBookListContext";
import { useEditPageContext } from "../hooks/useEditingPageContext";
import { useLocalStorageOperations } from "../hooks/useLocalStorageOperations";


export function EditingPage(){


    const {active, setActive, relevantBook: bookObject } = useEditPageContext()

    const {saveBookToLocalStorage} = useLocalStorageOperations()

    const {setStaleData} = useBookListContext()

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        author: '',
        published: '',
        description: '',
      });

      useEffect(()=>{
        let description = ''
        if(bookObject?.description === ''){
            description = `Relevant Subjects: ${bookObject?.subjects ? bookObject?.subjects.join(", ") : "none found"}. Selected Revision: ${bookObject?.revision ? bookObject.revision : "unknown"} `
        }

        setFormData({
            id: bookObject?.OLID ?? "",
            author: bookObject?.author ?? "",
            title: bookObject?.title ?? "",
            published: bookObject?.publish_date ?? "",
            description: bookObject?.description === "" ? (description) : bookObject?.description ?? '',
        })
      }, [bookObject?.OLID, bookObject?.author, bookObject?.title, bookObject?.publish_date, bookObject?.description, bookObject?.subjects, bookObject?.revision])
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = useCallback(() => {
        if(!bookObject) return
        saveBookToLocalStorage({author: formData.author, description: formData.description, dateAdded: bookObject.dateAdded, OLID: bookObject.OLID , publish_date: bookObject.publish_date, revision: bookObject.revision, subjects: bookObject.subjects, title: formData.title })
        setStaleData(true)
        setActive(false)
        
    }, [bookObject, formData.author, formData.description, formData.title, saveBookToLocalStorage, setActive, setStaleData]);
    
      const handleCancel = useCallback(() => {
        setActive(false)
      }, [setActive]);
      
      
      return (
        <div className={`absolute top-0 left-0 bg-white 1  ${active ? 'z-30 opacity-1 h-screen w-screen' : "z-0 opacity-0 h-0 w-0 p-0"}`}>
            <h4 className="text-3xl font-bold text-center"> EDIT BOOK</h4>
          <form className="flex items-center justify-center flex-col gap-4 p-8" onSubmit={handleSubmit}>
            <div className="form-group ">
              <label className="font-bold p-4">ID:</label>
              <span>{bookObject?.OLID ?? ""}</span>
            </div>
            <div className="form-group">
              <label className="font-bold p-4">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded-md"
              />
            </div>
            <div className="form-group">
              <label className="font-bold p-4">Author:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="border rounded-md"
              />
            </div>
            <div className="form-group">
              <label className="font-bold p-4">Published:</label>
              <input
                type="text"
                name="published"
                value={formData.published}
                onChange={handleChange}
                className="border rounded-md"
              />
            </div>
            <div className="form-group">
              <label className="font-bold p-4">Description:</label>
              <br></br>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border w-72 md:w-[75vw] p-4 h-20 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-center items-center gap-6">
              <button type="button" className="border rounded-md w-24 p-4" onClick={handleCancel}>
                Cancel
              </button>
              <button  className="border rounded-md w-24 p-4" type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
    }