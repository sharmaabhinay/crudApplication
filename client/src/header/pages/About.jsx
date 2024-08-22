import React, { useState } from "react";
import axios from "axios";
import "./file.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let url = 'https://crud-application-k1lr.vercel.app'

const About = () => {
  const notify = (message) => toast(message);

  let [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    gender:'',
    dob:'',
    qualification:''
  });
  const setfun = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const subData = async (e) => {
    notify();
    e.preventDefault();
    let data = {
      username: userData.name,
      email: userData.email,
      phone: userData.phone,
      city: userData.city,
      gender:userData.gender,
      dob:userData.dob,
      qualification:userData.qualification
    };
    if (userData.name.length == 0) {
      notify("invailid input");
    } else if (userData.email.length == 0) {
      notify("invailid email");
    } else {
      try {
        let res = await axios.post(`${url}/register-user`, data);
        if (res.data == "submited") {
          userData.name.value == '';
          notify("Data submited");
          
        } else if (res.data == "exists") {
          notify("email is already registered");
        } else if (res.data == "error") {
          notify("server is down");
        } else {
          notify("failed to submit");
        }
      } catch (err) {
        throw notify("server is down due to", err);
      }
    }
  };
  return (
    <>
      <div>
        <div className="navparent">
          <form action="" onSubmit={subData}>
            <div className="inputparent">
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={setfun}
              />
              <input
                type="date"
                name="dob"
                placeholder="dd-mm-yy"
                onChange={setfun}
                style={{width:'100%'}}
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={setfun}
              />
              <input
                type="number"
                name="phone"
                placeholder="phone"
                onChange={setfun}
              />
              <input
                type="text"
                name="city"
                placeholder="city"
                onChange={setfun}
              />
              <select onChange={setfun} className="select" name="qualification">
                <option value="" selected>qualification</option>
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
            <div className="genderparent">
            <input
                type="radio"
                name="gender"
                value="male"
                onChange={setfun}
              /><label>Male</label> 
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={setfun}
              /><label>Female</label> 
            </div>
            
            <div className="buttons">
              <button type="submit">submit</button>
              <button type="reset">reset</button>
            </div>
          </form>
          <div>
            {/* <button onClick={notify}>Notify!</button> */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
