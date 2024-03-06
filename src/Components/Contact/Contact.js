import React,{useState,useEffect} from 'react'
import './Contact.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import {  faFacebookF ,faLinkedin,faTwitterSquare,faInstagram} from '@fortawesome/free-brands-svg-icons';
function Contact() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [message,setMessage]=useState("");
    const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [buttonColor, setButtonColor] = useState('pink');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // You can customize this regex based on the expected phone number format
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

    
    // axios.defaults.headers.post['Content-Type'] = 'text/plain';
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error('Invalid email format');
            return;
          }
      
          if (!validatePhone(phone)) {
            toast.error('Invalid phone number format');
            return;
          }

        const data ={
            Email:email,
            Message:message,
            Name:name,
            Phone:phone
        }
        setButtonColor('pink');
        axios.post('https://sheet.best/api/sheets/37336eae-7a24-4880-b95a-d4c1221cd875',data).then((response)=>{
        
        setButtonColor('green');
        setName('');
        setEmail('');
        setMessage('');
        setPhone('');
        })
        .catch((error) => {
            console.error('Error posting data:', error);
            toast.error('Error posting data');
    
            // Change button color back to pink on error
            setButtonColor('pink');
          });
      };
      
      useEffect(() => {
        const timer = setTimeout(() => {
          // Change button color to pink after 5 seconds
          setButtonColor('pink');
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [buttonColor]);
  return (
    <div><div class="container">
    <span class="big-circle"></span>
    <img src="img/shape.png" class="square" alt="" />
    <div class="form">
      <div class="contact-info">
        <h3 class="title">Let's get in touch</h3>
        <p class="text">
          Contact us form for Assessli
        </p>

        <div class="info">
          <div class="information">
          <FontAwesomeIcon icon={faMap} style={{color: "#63E6BE",}} />
            <p>MCF 7835 Sanjay colony,Sec-23 faridabad,haryana</p>
          </div>
          <div class="information">
          <FontAwesomeIcon icon={faEnvelope} style={{color: "#63E6BE",}} />
                      <p>kumarakash121005@gmail.com</p>
          </div>
          <div class="information">
          <FontAwesomeIcon icon={faPhone} style={{color: "#63E6BE",}} />            <p>+91 8851320074</p>
          </div>
        </div>

        <div class="social-media">
          <p>Connect with us :</p>
          <div class="social-icons">
            <a href="#">
            <FontAwesomeIcon icon={faFacebookF} />
        
             </a>
            <a href="#">
            <FontAwesomeIcon icon={faInstagram} />         </a>
            <a href="#">
            <FontAwesomeIcon icon={faTwitterSquare} />     </a>
            <a href="#">
            <FontAwesomeIcon icon={faLinkedin} />          </a>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <span class="circle one"></span>
        <span class="circle two"></span>

        <form onSubmit={handleSubmit}>
          <h3 class="title">Contact us</h3>
          <div class="input-container">
            <input type="text" name="name" class="input" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            {!name && <label>Username</label>}
            <span>Username</span>
          </div>
          <div class="input-container">
            <input type="email" name="email" class="input" onChange={(e)=>{setEmail(e.target.value)}} value={email} />
           {!email && <label >Email</label>}
            <span>Email</span>
          </div>
          <div class="input-container">
            <input type="tel" name="phone" class="input" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
            {!phone && <label>Phone</label>}
            <span>Phone</span>
          </div>
          <div class="input-container textarea">
            <textarea name="message" class="input" onChange={(e)=>{setMessage(e.target.value)}} value={message}></textarea>
            {!message && <label>Message</label>}
            <span>Message</span>
          </div>
          <button type="submit" class="btn" style={{ backgroundColor: buttonColor }}><span>Send That Shit</span></button>
          <ToastContainer />
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Contact