import React from 'react'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Contact = () => {

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "79ec4b79-caa2-453e-83ec-72f98511f4ae");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      toast.success("Form submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message)
      setResult("");
    }
  };
  const bgTint = document.getElementById('bgTint');
  const bgUpdate = () =>{
    bgTint.classList.add("opacity-80");
  }
  const bgTintRemove =()=>{
    bgTint.classList.remove("opacity-80");
  }
  return (
    <div className='relative text-center p-6 py-20 lg:px-32 w-full overflow-hidden' id='Contact' style={{ backgroundImage: `url(${assets.connect_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Black Tint Overlay */}
  <div id='bgTint' className="absolute inset-0 bg-black opacity-50"></div>
  <div className='relative z-20'>
         <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center text-white'>Connect
        <span className='underline underline-offset-4 decoration-1 under font-light ml-3'>With Us</span></h1>
      <p className='text-center text-gray-200 mb-12 max-w-80 mx-auto'>Ready to Make a Move? Let's Build Future Together</p>


      
      <div className='justify-around'>
        <div>
          <form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-200 pt-8' >
            <div className='flex flex-wrap' onClick={bgUpdate}>
                <div className='w-full md:w-1/2 text-left' >
                   Your Name
                    <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' name='Name' type="text" placeholder='Your Name' required />
                </div>

                <div className='w-full md:w-1/2 text-left md:pl-4'>
                   Your Email
                    <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' name='Email' type="email" placeholder='Your Email' required />
               </div>
           </div>
            <div>
             <div className='w-full text-left mt-5'>
               Your Location 
               <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="text" name='Location' placeholder='Your Location' required />
              </div>
            </div>
        
            <div className='my-6 text-left'>
                Message 
                <textarea className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none ' name="Message" placeholder='Message' required></textarea>
            </div>
              <button onClick={bgTintRemove} className='bg-red-500 text-white py-2 px-12 mb-10 rounded'>{result ? result : "Send Message"}</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Contact
