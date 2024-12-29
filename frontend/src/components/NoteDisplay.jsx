function NoteDisplay({ isEdit, setIsEdit, displayContent, onDelete, noteColor, note }) {
    return <>
        <p 
            className='my-2 p-1 break-words'
            onDoubleClick={ () => setIsEdit(true) }>
        {displayContent()}
        </p>
        <button
            type='button'
            className='text-xs p-1 bg-red-400 rounded text-white float-right'
            onClick={ () => onDelete(note.id) }>
            Delete
        </button>
    </>
}

export default NoteDisplay;