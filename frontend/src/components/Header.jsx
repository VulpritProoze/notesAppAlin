import { forwardRef, useRef, useEffect } from 'react';

const Header = forwardRef(( { theme, setTheme }, ref ) => {
    const lightRef = useRef(null);
    const darkRef = useRef(null);

    useEffect( () => {
        if (theme == 'light') {
            if (darkRef.current && lightRef.current) {
                darkRef.current.classList.remove('hidden');
                lightRef.current.classList.add('hidden');
            }
        } else {
            if (lightRef.current && darkRef.current) {
                darkRef.current.classList.add('hidden');
                lightRef.current.classList.remove('hidden');
            }
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme == 'light') {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }
        // console.log('theme', theme);
        // console.log('theme 2', localStorage.getItem('theme'))
    };

    return <header ref={ref} className="p-4 border-b shadow-lg border-card-blue-border flex justify-between bg-theme w-full fixed top-0 left-0">
        <div>
            <h1 className="italic text-xl ml-2 uppercase font-bold">Notes</h1>
        </div>
        <div className="self-center flex items-center gap-2">
            <button 
                onClick={toggleTheme}
                className="rounded-[50%] flex justify-center items-center w-8 h-8 bg-card-text hover:scale-105 active:scale-100">
                <svg ref={darkRef} className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg ref={lightRef} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
            <button 
                onClick={ () => window.location.href = '/logout/' }
                className="font-bold bg-red-400 p-1 w-20 rounded text-white shadow hover:scale-105 active:scale-100">Logout</button>
        </div>
    </header>
});

export default Header;