import './App.css'
import { BookFilter } from './components/BookFilter'

import { BookList } from './components/BookList'
import { BookSelector } from './components/BookSelector'
import { EditingPage } from './components/EditingPage'
import { BookContextProvider } from './contexts/BookListContext'
import { EditPageContextProvider } from './contexts/EditPageContext'

function App() {
  
  
  
  


  return (
    <>
    <BookContextProvider>
      <EditPageContextProvider>
        <div className='p-2 relative flex items-center flex-col z-10'>
        <h1 className='text-3xl pt-4 font-bold flex items-center justify-center z-10'>
          Book Manager
        </h1>
        <BookSelector/>
        
        <BookFilter/>

        <BookList/>

        <EditingPage />
        </div>
      </EditPageContextProvider>
      </BookContextProvider>
    </>
  )
}

export default App
