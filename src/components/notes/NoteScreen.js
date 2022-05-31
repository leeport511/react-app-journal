import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'
import Swal from 'sweetalert2';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const {body, title, id} = formValues;

    const activeId = useRef(note.id); //no redibuja todo el componente si cambia el id (useRef)


    // se usa el efecto para que al cambiar el id, se vea la nota en pantalla
    useEffect(() => {
        
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
            
    }, [note, reset]);

    // se usa el efecto para que cambie el active note en redux
    useEffect(() => {
      
        dispatch( activeNote( formValues.id, {...formValues} ) )
    
      
    }, [formValues, dispatch]);

    const handleDelete = () => {

        dispatch (startDeleting( id ));

    }
         

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                
                    <input
                        type="text"
                        placeholder="Some awesome title" 
                        className="notes__title-input"
                        AutoComplete="off"
                        name="title"
                        value = {title}
                        onChange={handleInputChange}
                    />
                    

                    <textarea 
                        placeholder="What happened today"
                        className="notes__textarea"
                        name='body'
                        value = {body}
                        onChange={ handleInputChange }
                    />

                    {
                        (note.url) &&
                        <div className="notes__image">
                        <img
                            src= { note.url }
                            alt= "imagen"
                        />
                        </div>
                    }
                

            </div>

            <button
                className="btn-danger"
                onClick= {handleDelete}
            >
               Delete 
            </button>            

        </div>
    )
}
