import { React, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Button } from '../Button';
import '../../App.css';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  const { register, handleSubmit, reset, formState:{errors} } = useForm();

  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  const onSubmit = async (data) => {
    // Send form email
    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      };

      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className = 'page'>
      <h1>Contact Us</h1>
      <p>
      Thanks for your interest in Vega Racing. For more information, feel free to get in touch and we will get back to you soon!
      </p>
      <div className = 'contact-container'>
        <div className = 'contact-col'>
          <h2>GENERAL INFORMATION</h2>
          <h3>Address</h3>
          <p>Vega Racing Electric, PES University Mechanical Lab Block, Outer Ring Road, Banashankari 3rd Stage, Bengaluru, Karnataka - 560085</p>
          <br/><hr/>
          <h3>Team</h3>
          <div className = "contact-details">
            <div>
              <p id = 'info-heading'><b>Captain</b></p> 
              <p id = 'info'>Raj Purohit</p> 
              <p id = 'info'>+91 7090870459</p>
            </div>
            <div>
              <p id = 'info-heading'><b>Mechanical Head</b></p> 
              <p id = 'info'>Malvika R</p> 
              <p id = 'info'>+91 9591918680</p>
            </div>
            <div>
              <p id = 'info-heading'><b>Electrical Head</b></p> 
              <p id = 'info'>Aditya NG</p> 
              <p id = 'info'>+91 9035227971</p>
            </div>
          </div>
          <hr/>
          <h3>Faculty Advisors</h3>
          <div id = 'faculty-advisors' className = "contact-details">
            <div>
              <p id = 'info-heading'><b>Mechanical</b></p>  
              <p id = 'info'>Prof. Sharanbassappa S Patil</p>
              <p id = 'info'>sspatil@pes.edu</p>
            </div>
            <div>
              <p id = 'info-heading'><b>Electrical</b></p>
              <p id = 'info'>Dr. Rex Joseph</p>  
              <p id = 'info'>rexjoseph@pes.edu</p>
            </div>
          </div>
          <hr/><br/>
          <div className = 'contact-email'><a className = 'contact-email' href = "mailto:vegaracingelectric@pes.edu"><FaEnvelope className = "fa-symbol"/> vegaracingelectric@pes.edu</a></div>
        </div>
        
        <div className = 'contact-col' id = "contact-form">
          {/* <h2>LEAVE US A MESSAGE</h2> */}

          {/* <form action="https://docs.google.com/forms/u/0/d/1skTyAwfTTBzpdGvadEd26zvggLVhHl80w2ieMf8eC80/prefill"
                target="_self"
                methd="POST"

          >
            <p>
              <label>Name</label>
              <input required = "required" type = "text" name="entry.480218929" placeholder = "Name"/>
            </p>
            <p>
              <label>Institution</label>
              <input required = "required" type = "text" name="entry.142881535" placeholder = "Company / Institution"/>
            </p>
            <p>
              <label>Email Address</label>
              <input required = "required" type = "email" name="entry.915730125" placeholder = "Email ID"/>
            </p>
            <p>
              <label>Phone Number</label>
              <input required = "required" type = "text" name="entry.2141869491" placeholder = "Phone Number"/>
            </p>
            <p className = "full">
              <label>Message</label>
              <textarea name="entry.1367359104" rows = "4" placeholder = "Enter your message..."></textarea>
            </p>
            <div type = "submit" className = "center">
              <Button buttonStyle = 'btn--outline-full-width'>Submit</Button>
            </div>
          </form> */}
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScqhVW5kitVQVf4B7kwpsRAmojgmXi_hi_6tW1I3DwwETuDqg/viewform?embedded=true" >Loading…</iframe>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;