import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import LoadingIndicator from './LoadingIndicator';

function Form( {route, method, ifLogin} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                alert('User has been successfuly registered!');
                navigate('/login');
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const name = method === 'login' ? 'Login' : 'Register';

    return ( 
        <form 
        onSubmit={ handleSubmit }
        className='w-1/2 p-4 rounded shadow-lg border-border border flex gap-3 flex-col text-sm bg-card text-card-text'>
            <h1 className='text-center text-base font-medium'>{ name }</h1>
            <label className='flex flex-col'>
                Username:
                <input 
                    type="text" 
                    className='p-1 bg-card-secondary border border-border'
                    value={ username }
                    required
                    maxLength='100'
                    onChange={ (e) => setUsername(e.target.value) }
                    placeholder='e.g. JohnDoe'
                />
            </label>
            <label className='flex flex-col'>
                Password:
                <input 
                    type="password" 
                    className='p-1 bg-card-secondary border border-border'
                    value={ password }
                    required
                    maxLength='100'
                    onChange={ (e) => setPassword(e.target.value) }
                    placeholder='•••••••••••••'
                />
            </label>
            { loading && <LoadingIndicator />}
            { ifLogin ? 
                <a href="/register/" className='hover:underline hover:text-card-blue-secondary text-xs self-center'>New user? Sign-up now!</a> :
                <a href='/login/' className='hover:underline hover:text-card-blue-secondary text-xs self-center'>Return to log-in page</a>
            }
            <button
                className='bg-theme text-card-text shadow rounded p-1 hover:scale-105 active:scale-100'
                type='submit'>
                { name }
            </button>
        </form>
    );
}

export default Form;
