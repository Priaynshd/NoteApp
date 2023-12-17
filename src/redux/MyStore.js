import { configureStore } from "@reduxjs/toolkit";
import noteReducer from './NoteSlice'
const MyStore = configureStore({
    reducer:{
        note:noteReducer
    }
})

export default MyStore;