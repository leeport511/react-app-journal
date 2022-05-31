import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNotes, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = ({date}) => {

  const dispatch = useDispatch();
  const {active} = useSelector(state => state.notes);

   const handleSaveNote = () => {

    dispatch( startSaveNotes(active) );
    
  }

  const handlePicture = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch( startUploading( file ) )
    }
  }

  const noteDate = moment(date);


  return (
    <div className="notes__appbar">
        <span>{ noteDate.format("dddd, MMMM Do YYYY") }</span>

        <input
          id="fileSelector"
          type='file'
          name='file' 
          style={{display: 'none'}}
          onChange={handleFileChange}
        />

        <div>
            <button 
              className="btn"
              onClick={handlePicture}
            >
                Picture
            </button>

            <button 
              className="btn"
              onClick= {handleSaveNote}
            >
                Save
            </button>
        </div>
    </div>
  )
}
