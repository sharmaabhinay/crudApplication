import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Single = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4100/userdata/${id}`);
        // console.log(res.data[0]);
        setData(res.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [id]); // Adding 'id' as a dependency

  return (
    <div className='singlepage'>
      {/* <h2>name : {data.name}</h2> */}
      {data ? (
        <div className='singleparent'>
          <ul>
            <li>name : {data.name}</li>
            <li>email : {data.email}</li>
            <li>phone : {data.phone}</li>
            <li>DOB: {data.dob}</li>
            <li>gender : {data.gender}</li>
            <li>registration date : {data.date}</li>
            <li>city : {data.city}</li>
            <li>id : {data._id}</li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    
    </div>
  );
};

export default Single;
