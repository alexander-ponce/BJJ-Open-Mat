import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const AccountCreation = ({setUser}) => {
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [email, setEmail] = useState("")
    const [confirmE, setConfirmE] = useState("")
    const [password, setPassword] = useState("")
    const [confirmP, setConfirmP] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    // const [createdAt] = useState(Date())
    // const [updatedAt] = useState(Date())
    const [beltColors, setBeltColors] = useState(['', 'White', 'Blue', 'Purple', 'Brown', 'Black']);
    const [beltColor, setBeltColor] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate()

    const handleBeltColorChange = (e) => {
      setBeltColor(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('register form')
        axios.post('http://localhost:8000/api/register', {
            first, last, email, confirmE, password, confirmP, beltColor, phoneNumber, aboutMe     
        }, { withCredentials: true })
            .then ( res => {
                console.log("logged user" + res.data.user)
                setUser(res.data.user)
                navigate("/searchopenmats")
              
            } )
            .catch(error => {
              console.log(error);
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setErrors(error.response.data.errors);
              }
            })}
    return (
      
      <div class='container d-flex justify-content-center'>
      <div class="col-6 ">
          <h2 className="text-center mt-4">
              Register
          </h2>
          <form className="mt-4" onSubmit={handleSubmit}>
              {/* first name */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">First Name:</label>
                  <div className="col-sm-6">
                      {errors.first && <span className="accent">{errors.first.message}</span>}
                      <input type='text' onChange={e=>setFirst(e.target.value)} className="form-control"/>
                  </div>
              </div>
  
              {/* last name */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">Last Name:</label>
                  <div className="col-sm-6">
                      {errors.last && <span className="accent">{errors.last.message}</span>}
                      <input type='text' onChange={e=>setLast(e.target.value)} className="form-control"/>
                  </div>
              </div>
  
              {/* email */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">Email:</label>
                  <div className="col-sm-6">
                      {errors.email && <span className="accent">{errors.email.message}</span>}
                      <input type='text' onChange={e=>setEmail(e.target.value)} className="form-control"/>
                  </div>
              </div>
  
              {/* confirm email */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">Confirm Email:</label>
                  <div className="col-sm-6">
                      {errors.confirmE && <span className="accent">{errors.confirmE.message}</span>}
                      <input type='text' onChange={e=>setConfirmE(e.target.value)} className="form-control"/>
                  </div>
              </div>
  
              {/* password */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">Password:</label>
                  <div className="col-sm-6">
                      {errors.password && <span className="accent">{errors.password.message}</span>}
                      <input type='password' onChange={e=>setPassword(e.target.value)} className="form-control"/>
                  </div>
              </div>
  
              {/* confirm email */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">Confirm Password:</label>
                  <div className="col-sm-6">
                      {errors.confirmP && <span className="accent">{errors.confirmP.message}</span>}
                      <input type='password' onChange={e=>setConfirmP(e.target.value)} className="form-control"/>
                  </div>
              </div>
  
              <div className="form-group row justify-content-center ">
                  <label className="col-sm-2 col-form-label">Belt Color:</label>
                  <div className="col-sm-6">
                      {errors.beltColor && <span className="accent">{errors.beltColor.message}</span>}
                      <select value={beltColor} onChange={handleBeltColorChange} className="form-control" >
                        <option value="" disabled hidden>Select a belt color...</option>
                        {beltColors.map((color, index) => (
                            <option key={index} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                  </div>
              </div>

              {/* phone number */}
              <div className="form-group row justify-content-center mb-3">
                  <label className="col-sm-2 col-form-label">Phone Number (optional):</label>
                  <div className="col-sm-6">
                      {errors.phoneNumber && <span className="accent">{errors.phoneNumber.message}</span>}
                      <input type='text' onChange={e=>setPhoneNumber(e.target.value)} className="form-control"/>
                  </div>
              </div>

              {/* about me */}
              <div className="form-group row justify-content-center mb-3">
                <label className="col-sm-2 col-form-label">About Me:</label>
                <div className="col-sm-6">
                    {errors.aboutMe && <span className="accent">{errors.aboutMe.message}</span>}
                    <textarea 
                        rows="5"  // defines the number of visible text lines, can be adjusted
                        onChange={e => setAboutMe(e.target.value)} 
                        className="form-control"
                        placeholder="Tell us about yourself...">
                    </textarea>
                </div>
            </div>
  
              <div className="form-group justify-content-center">
                  <input type='submit' value='Submit' className="btn btn-primary mt-3"/>
              </div>
          </form>
      </div>
  </div>
  

    )
}

export default AccountCreation