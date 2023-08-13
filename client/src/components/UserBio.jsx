import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate} from "react-router-dom";

const ViewOpenMat = (props) => {
    // const {store, setStore} = props;
    const [events, setEvents] = useState([]);
    const { user, setUser } = props;
    const [openMat, setOpenMat] = useState({})
    const {id} = useParams(); 
    const navigate = useNavigate();


const [formData, setFormData] = useState({
    
      creator: {
          first: '',
          last: '',
          phoneNumber: '',
          aboutMe: '',
          beltColor: ''
      }
  });


  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
        .then( res => {
            console.log(res.data);
            // setUserData(res.data);
            setOpenMat(res.data);


        })
        
        .catch( err => console.log(err) );
}, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/openmats/${id}`)
            .then( res => {
                console.log(res.data);
                setOpenMat(res.data);

            })
            .catch( err => console.log(err) );
    }, []);
    

    //pass ID?? ^^

    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/openmats/${id}`, { withCredentials: true })
        .then(res => {
          console.warn(res.data);
          const { name, date, time, address, matFee, creator } = res.data;
          setFormData({ name, date, time, address, matFee, creator });
        })
        .catch(err => {
          console.log("Error fetching open mat: ", err);
        });
    }, [id]);


  return (
    <div>

        <h2 className="mt-4">{formData.creator.first} {formData.creator.last}</h2>

                <div>
                    <p className="mt-4"> </p> 
                </div>
                <div>
                    <p>Belt Color: {formData.creator.beltColor}</p>
                </div>
                <div>
                    <p>Phone Number: {(formData.creator.phoneNumber)}</p>
                </div>
                

                <div>
                <p className=''>About Me:  </p>
                <p>{formData.creator.aboutMe}</p>
                </div>
                

    </div>
            )
}

export default ViewOpenMat