import { useRef, useEffect } from 'react';
import api from '../api';

function NoteTitle({ isTitleEdit, setIsTitleEdit, title, setTitle, noteColor, note }) {
    const inputRef = useRef(null);
    const formRef = useRef(null);

    useEffect( () => {
        if (isTitleEdit) {
            document.addEventListener('mousedown', handleClickOutside);
        } 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTitleEdit]);

    const updateTitle = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/api/notes/${note.id}/`, { ...note, title });
            if (res.status === 200 || res.status === 204) {
                // alert('Title updated successfully.');
                setIsTitleEdit(false);
            } else {
                alert('Failed to update title!');
            }
        } catch (err) {
            alert(err);
        }
    };

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            formRef.current.requestSubmit();
        }
    }

    const handleClick = () => {
        setIsTitleEdit(true);
    };

    return <>
        { !isTitleEdit ?
            <p 
                className='text-base font-bold'
                onClick={handleClick}>{title}</p> :
            <form ref={formRef} onSubmit={updateTitle}>
                <input
                    ref={inputRef} 
                    type="text"
                    onChange={ (e) => setTitle(e.target.value) }
                    className={`text-base font-bold text-card-text w-full bg-${noteColor}-secondary border border-${noteColor}-border p-1`}
                    required
                    value={title}
                />
            </form>
        }
    </>
}

export default NoteTitle;

