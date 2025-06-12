import React from 'react'
import AboutImg from '../../assets/images/about-us.jpg';
const About = () => {
  return (
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
  )
}

export default About
