import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

let url = "https://crud-application-k1lr.vercel.app";

const Admin = () => {
  const [data, setData] = useState([]);
  const notify = (message) => toast(message);
  const [gindicator, setGindicator] = useState(true);
  const [Ivalue, setIvalue] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const searchR = async (e) => {
    e.preventDefault();
    let searchData = { data: Ivalue };
    try {
      let res = await axios.post(`${url}/search`, searchData);
      setData(res.data);
    } catch (err) {
      throw err;
    }
  };
  //fetching the data first time
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/users`);
      setData(response.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  //function to delete a particular data
  const handleonClick = async (iid) => {
    try {
      const res = await axios.delete(`${url}/delete/${iid}`);
      if (res.data == "delete") {
        throw res.data;
      } else {
        setTimeout(() => {
          notify("Data Deleted");
        }, 500);
        try {
          const response = await axios.post(url);
          setData(response.data);
        } catch (error) {
          throw error;
        }
      }
    } catch (err) {
      throw err;
    }
  };

  //updating the setuserData
  const updateData = (i) => {
    document.querySelector(".updateForm").style.display = "grid";
    document.querySelector(".name").value = i.name;
    document.querySelector(".email").value = i.email;
    document.querySelector(".phone").value = i.phone;
    document.querySelector(".city").value = i.city;
    setUserData({
      id: i._id,
      name: i.name,
      email: i.email,
      phone: i.phone,
      city: i.city,
    });
  };
  const setfun = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //submit
  const subData = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`${url}/update`, userData);
      if (res.data) {
        document.querySelector(".updateForm").style.display = "none";
        notify("Data updated");

        try {
          const response = await axios.post(url);
          setData(response.data);
        } catch (error) {
          throw error;
        }
      } else {
        notify("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //gender filter function
  const genderfilter = async (e) => {
    let genders = { gender: e.target.value };
    if (gindicator == true) {
      data.filter((items)=> items.gender == genders.gender )
      console.log(data.filter((items)=> items.gender == genders.gender ))
      setGindicator(false);
    } else {
      fetchData()
      setGindicator(true);
    }
  };
  const gradefilter = async (e) => {
    let grades = { grade: e.target.value };
    if (e.target.value != "all") {
      try {
        let res = await axios.post(`${url}/qualificationfilter`, grades);
        setData(res.data);
      } catch (err) {
        throw err;
      }
    } else {
      fetchData()
    }
  };
  const handleOnD = (e) => {
    console.log(e);
    console.log("span clicked", e);
  };
  //this function will close the opened portal
  const closeportal = () => {
    document.querySelector(".updateForm").style.display = "none";
  };

  const handleCrossClick = ()=>{
    setIvalue("")
    fetchData()
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      {/* update form portal */}
      <div className="updateForm">
        <form action="" onSubmit={subData}>
          <div className="inputparent">
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={setfun}
              className="name"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={setfun}
              className="email"
            />
            <input
              type="number"
              name="phone"
              placeholder="phone"
              onChange={setfun}
              className="phone"
            />
            <input
              type="text"
              name="city"
              placeholder="city"
              onChange={setfun}
              className="city"
            />
          </div>
          <div className="buttons">
            <button type="submit">submit</button>
            <button className="close" type="reset" onClick={closeportal}>
              close
            </button>
          </div>
        </form>
      </div>
      {/* data container/result container div */}
      <div className="dataContainer">
        <form className="searchcontainer" style={{display:'flex',justifyContent:'end'}}>
          <div className="input-cross-container" style={{display:'flex'}}>
            <input
              type="text"
              value={Ivalue}
              placeholder="name , email, city , number"
              onChange={(e) => setIvalue(e.target.value)}
            />
            <div onClick={handleCrossClick} className="inputCross" style={{border:"1px 1px 1px 0px solid black",cursor:'pointer', color: Ivalue.length <=0 ? 'white':'black'}}>X</div>
          </div>
          <button onClick={searchR} type="submit" className="search-button">
            search
          </button>
        </form>
        <div className="total">
          <div>Total : 0{data.length}</div>
        </div>
        {/* gender filter div */}
        <div style={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <input
            type="checkbox"
            name="genderm"
            value="male"
            onChange={genderfilter}
          />
          <label htmlFor="">male</label>
          <input
            type="checkbox"
            name="genderf"
            value="female"
            onChange={genderfilter}
          />
          <label htmlFor="">female</label>
          <select name="gradefilter" id="gradefilter" className="selection-filter" onChange={gradefilter} style={{background:'skyblue',color:'white',width:'7rem',border:'1px solid white'}}>
            <option value="all" selected>
              all
            </option>
            <option value="10">10th</option>
            <option value="12">12th</option>
            <option value="diploma">diploma</option>
            <option value="graduate">graduate</option>
            <optgroup label="masteres"></optgroup>
            <option value="mca">mca</option>
            <option value="m.tech">m.tech</option>
            <option value="LLm">LLM</option>
          </select>
        </div>
        <div></div>
        <table width={300} className="table">
          <thead>
            <tr>
              <th>s.no</th>
              {/* <th>id</th> */}
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>city</th>
              <th>gender</th>
              <th>dob</th>
              <th>date</th>
              <th>qualification</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link to={`/user/${item._id}`}>{i + 1}</Link>
                </td>
                {/* <td>{item._id.toString()}</td> */}
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>+91 {item.phone}</td>
                <td>{item.city}</td>
                <td>{item.gender}</td>
                <td>{item.dob}</td>
                <td>{item.date}</td>
                <td>{item.qualification}</td>
                <span
                  onClick={() => handleonClick(item._id.toString())}
                  className="cross"
                >
                  {" "}
                  ❌
                </span>
                <span onClick={() => updateData(item)} className="editPen">
                  🖊️
                </span>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
