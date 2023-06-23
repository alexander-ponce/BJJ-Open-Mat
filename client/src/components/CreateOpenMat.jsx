import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';


const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


function MyForm(props) {
    const autocompleteInputRef = useRef(null);
    const {user, setUser} = props;
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        address: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState('')

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/user-current`, { withCredentials: true })
    //         .then(res => {
    //             // show the user returned
    //             console.log("logged user" + res.data.first)
    //             // 4) UPDATE THE STATE WITH CORRECT DATA
    //             setUser(res.data);
    //         })
    //         .catch(err => {
    //             console.log("current user error: " + err)
    //             setUser({})
                
    //     });
    // }, []);

    useEffect(() => {
        loadGoogleScript().then(() => {
            const autocomplete = new window.google.maps.places.Autocomplete(
                autocompleteInputRef.current,
                {"fields": ["formatted_address"]}
            );

    //         autocomplete.addListener('place_changed', () => {
    //             const selectedPlace = autocomplete.getPlace();
                
    // if (selectedPlace.address_components) {
    // const address = selectedPlace.formatted_address;
    // const components = selectedPlace.address_components;
    
    // const cityComponent = components.find(c => c.types.includes('locality'));
    // const city = cityComponent ? cityComponent.long_name : "";

    // const stateComponent = components.find(c => c.types.includes('administrative_area_level_1'));
    // const state = stateComponent ? stateComponent.short_name : "";

    // const zipComponent = components.find(c => c.types.includes('postal_code'));
    // const zip = zipComponent ? zipComponent.long_name : "";
              
    //             if (address) {
    //               setFormData(prevState => ({
    //                 ...prevState,
    //                 address, city, state, zip
    //               }));
    //             }
    //         }
    //         });
    //     });
    // }, []);

            autocomplete.addListener('place_changed', () => {
                const selectedPlace = autocomplete.getPlace();
                const address = selectedPlace.formatted_address;

                if (address) {
                    setFormData(prevState => ({ ...prevState, address }));
                }
            });
        });
    }, []);

    function loadGoogleScript() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            document.body.appendChild(script);
        });
    }

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log("handleInputChange", formData);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/createopenmat', formData, { withCredentials: true }) 
        // axios.post('/api/createopenmat', formData) 
        .then (res => {
          console.log ("handleSubmit", formData);
          console.log(res);
          console.log(res.data);
          navigate(`/searchopenmats`);
      
        }
        )
        .catch (err => {console.log(err)
        setErrors(err.response.data.errors
          )})
    };

    return (

    // <div className="bg-dark text-white">
        <div className="container d-flex justify-content-center mt-4 ">   
        <div className="col-6">
        <form onSubmit={handleSubmit}>
            <div className='form-group row justify-content-center'>  
                <label htmlFor="name" className="col-sm-2 col-form-label">Gym/Location Name:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
            </div>

            <div className='form-group row justify-content-center'>  
                <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                </div>
            </div>

            <div className='form-group row justify-content-center'>
                <label htmlFor="time" className="col-sm-2 col-form-label">Time:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                    />
                    {errors.time && <div className="invalid-feedback">{errors.time.message}</div>}
                </div>
            </div>

            <div className='form-group row justify-content-center'>
                <label htmlFor="address" className="col-sm-2 col-form-label">Address:</label>
                <div className="col-sm-6">
                    <input
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        ref={autocompleteInputRef}
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                </div>
            </div>

            <div className="form-group justify-content-center">
                <button type="submit" className='btn btn-secondary mt-3'>Submit</button>
            </div>
        </form>
    </div>
</div>
// </div>

    
    );
}

export default MyForm;
