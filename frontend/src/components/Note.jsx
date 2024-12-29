import React, { useState } from 'react';
import NoteDisplay from './NoteDisplay';
import NoteEdit from './NoteEdit';
import NoteTitle from './NoteTitle';

function Note({ note, onDelete, noteColor }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isTitleEdit, setIsTitleEdit] = useState(false);
    const [content, setContent] = useState(note.content);
    const [title, setTitle] = useState(note.title);
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

    function displayContent() {
        const text = !isExpanded ? 'See more' : 'See less'; 
        const ellipsis = (
            <span className='cursor-pointer hover:underline'>
                ...{text}
            </span>
        );

        if (content.length > 100 && !isExpanded) {
            return <>
                {content.substring(0,100)}
                <span onClick={ () => setIsExpanded(true) }>
                    {ellipsis}
                </span>
            </>;
        }
        return <>
            {content}
            {isExpanded && (
                <span onClick={ () => setIsExpanded(false) }>
                    {ellipsis}
                </span>
            )}
        </>;
    } 

    return <div className={`p-2 bg-${noteColor} text-sm`}>
        <NoteTitle 
            isTitleEdit={isTitleEdit}
            setIsTitleEdit={setIsTitleEdit}
            title={title}
            setTitle={setTitle}
            noteColor={noteColor}
            note={note}
        />
        <p className='text-card-text-secondary italic text-xs'>Created: {formattedDate}</p>
        { isEdit ?
        <NoteEdit 
            content={content}
            setContent={setContent}
            setIsEdit={setIsEdit}
            onDelete={onDelete}
            note={note}
            noteColor={noteColor}
            formattedDate={formattedDate}
        /> : 
        <NoteDisplay
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            displayContent={displayContent}
            note={note}
            onDelete={onDelete}
            noteColor={noteColor}
            formattedDate={formattedDate}
        />}
    </div> 
}

export default Note;