import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate} from "react-router-dom";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { useDrag } from 'react-dnd';
// import DraggableImage from './DraggableImage';
// import DropTarget from './DropTarget';
    

const SearchOpenMats = (props) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const fetchOpenMats = () => {
    const url = searchTerm ? `http://localhost:8000/api/openmats?address=${searchTerm}` : "http://localhost:8000/api/openmats";
    axios.get(url)
      .then((res) => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        console.log(res.data);
        const futureEvents = res.data.filter((event) => {
          if (new Date(event.date) > currentDate) {
            return true;
          }
          else if (new Date(event.date).setHours(0,0,0,0) === currentDate.setHours(0,0,0,0)) {
            const eventTime = event.time.split(':');
            const eventHour = parseInt(eventTime[0], 10);
            const eventMinute = parseInt(eventTime[1], 10);
            return (eventHour > currentHour || (eventHour === currentHour && eventMinute > currentMinute));
          }
          return false;
        });

        setEvents(futureEvents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch open mats on mount and when searchTerm changes
  useEffect(fetchOpenMats, [searchTerm]);

  const convertTo12HourFormat = (timeString) => {
    const timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return hours + ':' + minutes + ' ' + ampm;
  }
  
  const deleteOpenMat = (id) => {
    // axios DELETE request
    axios.delete(`http://localhost:8000/api/openmat/${id}`)
      .then(res => {
        // After successful deletion, refetch the open mats
        fetchOpenMats();
      })
      .catch(err => console.error(err));
  };
      
  return (
    // <DndProvider backend={HTML5Backend}>
    <div className='bg-dark text-white searchpage' >
        {/* <DraggableImage />
        <DropTarget /> */}
        <h1 className="py-4">Brazilian Jiu Jitsu Open Mats</h1>
        <h4 className="mt-4"> Find Open Mats in your area!</h4>
        
        <label htmlFor="search" className='mx-2' >Search for a Dojo! </label>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by address" className='my-4'/>


        <table className="table">
            <thead className="thead-dark">
            <tr>  
                <th className='text-white'>Gym/Location Name:</th>
                <th className='text-white'>Action:</th>
                <th className='text-white'>Address:</th>
                <th className='text-white'>Date:</th>
                <th className='text-white'>Time:</th>
                {/* <th>State</th> */}
                <th className='text-white'>Created By:</th>
            </tr>  
            </thead>

            <tbody>
              {props.user._id}
            {
                  Array.isArray(events) && events.map((place, idx) => {
                    
                    return (
                <tr key={idx}>
                    <td className='text-white'>
                      <Link className='text-white' to={`/viewopenmat/${place._id}`}> {place.name}</Link></td>


                    <td className='text-white'> {props.user && props.user._id === place.creator._id && <button className='btn btn-danger' onClick={() => deleteOpenMat(place._id)}>Delete</button>}
                    {
                    props.user._id === place.creator._id &&
                    <Link to={`/editopenmat/${place._id}`}>
                        <button className='btn btn-warning'>Edit</button>
                    </Link>
                    }
                    <Link className="btn btn-primary" to={`/viewopenmat/${place._id}`}> View</Link>
                    {/* <Link to={`/api/openmat/${place._id}`} className="px-4 nav-link btn btn-warning">Edit Open Mat</Link> */}
                </td>
                    <td className='text-white'>{place.address}</td>
                    <td className='text-white'>{place.date}</td>
                    <td className='text-white'>{convertTo12HourFormat(place.time)}</td>

                    {/* <td>{place.state}</td> */}
                    <td className='text-white'>{place.creator.first} {place.creator.last} </td>
                    {/* <td><button className="btn btn-danger" onClick={(e)=>{deleteStore(place._id)}}> Delete </button></td> */}
                </tr>
                )})}       
            </tbody>
        </table>
        
    </div>
    // </DndProvider>
  )
}

export default SearchOpenMats