import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({setUser}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{ email, password}, { withCredentials: true })
            .then ( res => {
                //got rid of code below, it was causing an error.
                // console.log('user', res.data.user);
                setUser(res.data.user)
                navigate("/searchopenmats");
            })
            .catch( err => {console.log(err.response.data); setErrors(err.response.data.errors)} )
    }

    return (
        <div className='max-content'>
            <h2 className='my-4'>
                Login
            </h2>

            {errors && <span className='accent'>{errors}📸</span>}
            <form onSubmit = {handleSubmit}>
                {/* email */}
                <label>
                    Email:
                    <input type='text' className="mx-2" onChange={ e => setEmail(e.target.value) }/>
                </label>
                {/* password */}
                <label>
                    Password:
                    <input type='password' className="mx-2" onChange={ e => setPassword(e.target.value) } />
                </label>
                <input type='submit' value='Submit' className='btn btn-success'/>
            </form>
        </div>
    )
}

export default Login