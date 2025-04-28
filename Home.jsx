import React from 'react'

import AboutImg from '../../assets/images/about-us.jpg'
import Header from './common/Header';
import Footer from './common/Footer';
const Home = () => {
  return (
    <>
    <Header/>
    <main>
              {/* Hero Section */}
        <section className='section-1'>
            <div className='hero d-flex align-items-center'>
                <div className='container-fluid'>
                    <div className='text-center'>
                        <span>Welcome Amazing Constructions</span>
                        <h1>Crafting dreams with <br/>precision and excellence.</h1>
                        <p>We excel at trnsforming visions into reality through outstanding craftmanship and precise<br/>attention to detail. With years of
                        experience and a dedication to quality.</p>
                        <div className='mt-4'>
                            <a className='btn btn-primary'>Contact Now</a>
                            <a className='btn btn-secondary ms-2'>View Projects</a>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        {/* About Us Section */}
          <section className='section-2 py-5'>
              <div className='container py-5'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <img src={AboutImg} className='w-100' alt="" />
                    </div>
                    <div className='col-md-6'>
                      <span>about us</span>
                      <h2>Crafting structures that last a lifetime</h2>
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, cumque eos quibusdam qui ullam ad rem est, voluptate velit aperiam nostrum voluptas exercitationem libero placeat animi a molestias omnis ab.</p>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, assumenda. At incidunt dicta totam eos commodi eligendi temporibus blanditiis earum quos soluta sunt, officiis numquam alias labore hic! Aliquid, suscipit?</p>
                    </div>
                  </div>
              </div>
          </section>
          {/* Our Services */}
          <section className='section-3 bg-light'>
            <div className='container-fluid'>
              <div className='section-header text-center'>
                <span>Our Services</span>
                <h2>Our Construction services</h2>
                <p>We offer a diverse array of construction services,spanning residential, commercial, and industrial projects.</p>

              </div>
            </div>
          </section>

    </main>
    <Footer/>
    </>
    
    
  )
}

export default Home
