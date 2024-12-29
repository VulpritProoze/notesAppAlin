import Form from '../components/Form';

function Login() {
    return <div className='w-full min-h-screen flex items-center justify-center'>
        <Form route='/api/token/' method='login' ifLogin={true} />
    </div>
}

export default Login;