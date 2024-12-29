import Form from '../components/Form';

function Register() {
    return <div className='w-full min-h-screen flex items-center justify-center'>
        <Form route='/api/user/register/' method='register' ifLogin={false} />
    </div>
}

export default Register;