import { useState, useEffect, useRef } from 'react';
import api from '../api';
import Note from '../components/Note';
import Header from '../components/Header';

function Home({ theme, setTheme }) {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect( () => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get('/api/notes/');
            const data  = res.data;
            setNotes(data); // data is an array of dictionary
            console.log(data);
        } catch (err) {
            alert(err);
        }
    };
    
    const deleteNote = async (id) => {
        let ifDelete = confirm('Are you sure you want to delete this note?');
        if (ifDelete) {
            try {
                const res = await api.delete(`/api/notes/delete/${id}/`);
                if (res.status === 204) {
                    // alert('Note deleted!');
                } else {
                    alert('Failed to delete note');
                }
            } catch (err) {
                alert(err);
            }
        }

        getNotes();
    }

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/notes/', { content, title });
            if (res.status === 201) {
                alert("Note created!");
            } else {
                alert("Failed to create note.");
            }
        } catch (err) {
            alert(err);
        }

        getNotes();
    }

    const colorWheel = ['card-blue', 'card-orange', 'card-red', 'card-yellow', 'card-yellow'];

    const headerRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect( () => {
        if (headerRef.current) {
            setWidth(headerRef.current.getBoundingClientRect().height);
        }
    }, []);

    return <div className='p-12 flex gap-4 flex-col bg-background text-copy-primary text-sm'>
        <Header ref={headerRef} theme={theme} setTheme={setTheme}/>
        <div 
            style={{'marginTop': `${width}px` }}
            className='bg-card border-border border min-h-52 p-6 rounded shadow-lg'>
            <h2 className='text-base mb-2'>Notes</h2>
            <div className='flex flex-col gap-2 text-card-text'>
                { notes.length > 0 ?
                    notes.map( (note, index) =>
                        <Note 
                            note={note} 
                            onDelete={deleteNote} 
                            noteColor={colorWheel[index % colorWheel.length]}
                            key={note.id} />
                    ) : (
                        <p className='text-center mt-8 w-full'>Empty notes... ( ╥ω╥ )</p>
                    )   
                }
            </div>
        </div>
        <form 
            onSubmit={createNote}
            className='flex flex-col gap-2 border-border border bg-card p-6 rounded shadow-lg'>
            <h2 className='text-base text-center'>Create a Note</h2>
            <input 
                type="text"    
                id='title' 
                name='title' 
                required 
                onChange={ (e) => setTitle(e.target.value) }
                value={title}
                placeholder='Title...'
                maxLength='100'
                className='p-1 rounded bg-card-secondary border border-border'
                />
            <textarea    
                id='content' 
                name='content' 
                required 
                onChange={ (e) => setContent(e.target.value) }
                value={content}
                className='resize-none rounded p-1 h-40 bg-card-secondary border-border border'
                placeholder='Content...'>
            </textarea>
            <input type="submit" className='bg-theme text-theme-text p-1 rounded shadow cursor-pointer hover:scale-105 active:scale-100'/>
        </form>
    </div>
}

export default Home;