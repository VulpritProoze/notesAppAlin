import { useState } from 'react';
import api from '../api';

function NoteEdit({ content, setContent, setIsEdit, onDelete, noteColor, note }) {
    const [localContent, setLocalContent] = useState(content);

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/api/notes/${note.id}/`, { ...note, content });
            if (res.status === 200 || res.status === 204) {
                // alert('Note updated successfully!');
                setIsEdit(false);
                setLocalContent(content);
            } else {
                alert('Failed to update note.');
            }
        } catch (err) {
            alert(err);
        }
    }

    function cancelUpdate() {
        setContent(localContent);
        setIsEdit(false);
    }

    return <form onSubmit={updateNote}>
        <textarea 
            className={`my-2 p-1 break-words min-h-40 w-full resize-none bg-${noteColor}-secondary border border-${noteColor}-border`}
            value={content}
            required
            onChange={ (e) => setContent(e.target.value) }>
        </textarea>
        <div className='flex flex-row-reverse gap-1'>
            <button
                type='submit'
                className='text-xs p-1 w-16 bg-green-400 rounded text-white hover:scale-105 active:scale-100'>                    
                Save
            </button>
            <button
                type='button'
                onClick={ cancelUpdate }
                className='text-xs p-1 w-16 bg-orange-400 rounded text-white hover:scale-105 active:scale-100'>
                Cancel
            </button>
            <button
                type='button'
                className='text-xs p-1 w-16 bg-red-400 rounded text-white hover:scale-105 active:scale-100'
                onClick={ () => onDelete(note.id) }>
                Delete
            </button>
        </div>
    </form >
}

export default NoteEdit;