import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

const ContactUs = () => {
  return (
    <>
    <Header/>
    <main>
    <Hero preHeading='Quality. Integrity. Value.' 
            heading='ContactUs'
        text='Contact us for any inquiries or requests—our team is ready to assist you anytime.'/>
        <section className='section-9 py-5'>
            <div className='container'>
                <div className='section-header text-center'>
                    <span></span>
                    <h2>Contact Us</h2>
                    <p>Our dedicated experts are here to help yiu with any of your questions, contact us by<br/>
                    filling out the form below and we will be in touch shortly.</p>  
                </div>

                <div className='row mt-5    '>
                <div className='col-md-3'>
                    <div className='card shadow border-0 mb-3'>
                        <div className='card-body p-4'>
                            <h3>Call Us</h3>
                            <div><a href="#">(000-000-0000)</a></div>
                            <div><a href="#">(000-000-0000)</a></div>

                            <h3 className='mt-4'>email</h3>
                            <div><a href="#">albasel@gmail.com</a></div>
                            <div><a href="#">baconstruction@gmail.com</a></div>

                            <h3 className='mt-4'>Address:</h3>
                            <div>Kingdom of Saudi Arabia<br/>Riyadh,Al-safa,Exit 14</div>

                        </div>
                    </div>
                </div>

                <div className='col-md-9'>
                    <div className='card shadow border-0'>
                        <div className='card-body p-5'>
                        <form action="">
                            <div className='row'>
                                <div className='col-md-6 mb-4'>
                                    <label htmlFor="" className='form-lable'>Name</label>
                                    <input type="text" className='form-control form-control-lg' placeholder='Enter Your Name' />
                                </div>
                                <div className='col-md-6 mb-4'>
                                <label htmlFor="" className='form-lable'>Email</label>
                                <input type="text" className='form-control form-control-lg' placeholder='Enter Your Email' />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6 mb-4'>
                                    <label htmlFor="" className='form-lable'>Phone</label>
                                    <input type="text" className='form-control form-control-lg' placeholder='Enter Your Phone Number' />
                                </div>
                                <div className='col-md-6 mb-4'>
                                <label htmlFor="" className='form-lable'>Subject</label>
                                <input type="text" className='form-control form-control-lg' placeholder='Subject' />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className='form-lable'>Message</label>
                                <textarea name="" id="" placeholder='Message' rows={5} className='form-control form-control-lg'>
                                </textarea>
                            </div>
                            <button className='btn btn-primary large mt-3'>Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        
              
        </section>
    </main>
    <Footer/>
    </>
  )
}

export default ContactUs
