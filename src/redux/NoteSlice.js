import {createSlice} from '@reduxjs/toolkit';

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    data: [],
  },
  reducers: {
    addNote(state, action) {
      state.data.push(action.payload);
    },
    updateNote(state, action) {
      let temp = state.data;
      temp.map((item, index) => {
        if (index == action.payload.index) {
          item.title = action.payload.title;
          item.data = action.payload.data;
          item.color= action.payload.color
        }
      });
      state.data = temp;
    },
    deleteNote(state,action){
        let temp=state.data;
        const final=temp.filter((item,index)=>{
            return index!=action.payload
        })
        state.data=final
    
  },
}
});

export const {addNote,updateNote,deleteNote} = noteSlice.actions;
export default noteSlice.reducer;
