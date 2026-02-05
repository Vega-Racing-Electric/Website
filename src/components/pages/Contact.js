import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import '../../App.css';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Contact = () => {
  // 1. Initialize State (This was missing before!)
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  // 2. The Email Logic
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Make sure your Service ID, Template ID, and User ID are correct here
    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID,   // OR replace with string "service_xxxxx"
      process.env.REACT_APP_TEMPLATE_ID,  // OR replace with string "template_xxxxx"
      form.current,
      process.env.REACT_APP_USER_ID       // OR replace with string "user_xxxxx"
    )
    .then(() => {
      toast.success('Message sent successfully!', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    })
    .catch((error) => {
      console.log(error.text);
      toast.error('Failed to send message. Please try again.', {
        position: 'bottom-right',
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className='page'>
      <h1>Contact Us</h1>
      <p>
        Thanks for your interest in Vega Racing. For more information, feel free to get in touch and we will get back to you soon!
      </p>
      
      <div className='contact-container'>
        {/* LEFT COLUMN: GENERAL INFO */}
        <div className='contact-col'>
          <h2>GENERAL INFORMATION</h2>
          <h3>Address</h3>
          <p>Vega Racing Electric, PES University Mechanical Lab Block, Outer Ring Road, Banashankari 3rd Stage, Bengaluru, Karnataka - 560085</p>
          <br /><hr />
          
          <h3>Team Captains</h3>
          {/* This grid-template-columns: 1fr 1fr in CSS keeps them equal */}
          <div className="contact-details">
            <div>
              <p id='info-heading'><b>Arnav Rao</b></p>
              <p id='info'>+91 8310908323</p>
            </div>
            <div>
              <p id='info-heading'><b>Dhruva Meravanige</b></p>
              <p id='info'>+91 7760971429</p>
            </div>
          </div>
          <hr />
          
          <h3>Faculty Advisors</h3>
          {/* Added inline style to force center alignment for the single advisor */}
          <div id='faculty-advisors' className="contact-details" style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
            <div>
              <p id='info-heading'><b>Dr. Rex Joseph</b></p>
              <p id='info'>rexjoseph@pes.edu</p>
            </div>
          </div>
          <hr /><br />
          
          <div className='contact-email'>
            <a className='contact-email' href="mailto:vegaracingelectric@pes.edu">
              <FaEnvelope className="fa-symbol" /> vegaracingelectric@pes.edu
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className='contact-col' id="contact-form">
          <h2>LEAVE US A MESSAGE</h2>

          <form ref={form} onSubmit={sendEmail}>
            <p id="info-heading">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name" // This 'name' attribute is what EmailJS looks for in the template
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>

            <p id="info-heading">
              <label htmlFor="email">Email Addressssssss</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="yourname@company.domain"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <p className="full" id="info-heading">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Drop us a message!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </p>

            <div className="center">
              <button
                type="submit"
                className="btn--outline-full-width"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.5 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;