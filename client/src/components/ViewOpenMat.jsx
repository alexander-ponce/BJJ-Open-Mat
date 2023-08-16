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
      name: '',
      date: '',
      time: '',
      address: '',
      matFee: '',
      creator: {
          first: '',
          last: '',
          phoneNumber: ''
      }
  });


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
      

      const convertTo12HourFormat = (timeString) => {
        const timeParts = timeString.split(':');
        let hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return hours + ':' + minutes + ' ' + ampm;
      }
      


  return (
    <div>

        <h2 className="mt-4">{formData.name}</h2>

                <p className="mt-4"> </p>
                <p>Address: {formData.address}</p>
                <p>Date: {formData.date.substring(0,10)}</p>
                <p>Time: {convertTo12HourFormat(formData.time)}</p>

                <div>
                <p className=''>Created by: {formData.creator.first} {formData.creator.last} </p>
                </div>
                <div>
                <p className=''>Phone Number: {formData.creator.phoneNumber} </p>
                </div>
                <div>
                <p className=''>Mat Fee: {formData.matFee && formData.matFee !== 0 ? `$${formData.matFee}` : 'Free'} </p>

                {/* <p className=''>Mat Fee: ${formData.matFee} </p> */}
                {/* <p className=''>Mat Fee: {"$" + formData.matFee || "free"} </p> */}

                </div>

                </div>
            )
}

export default ViewOpenMat