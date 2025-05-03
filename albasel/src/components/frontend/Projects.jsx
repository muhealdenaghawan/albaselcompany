import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'
import ConstructionImg from '../../assets/images/construction2.jpg';
import ConstructionImg1 from '../../assets/images/111.jpg';

const Projects = () => {
  return (
    <>
    <Header/>
    <main>
        <Hero preHeading='Quality. Integrity. Value.' 
        heading='Our Projects'  
        text='Explore our top completed projects, reflecting our commitment to quality and precise deadlines.'
        />
    </main>
    <section className='section-3 bg-light py-5'>
                <div className='container py-5'>
                  <div className='section-header text-center'>
                    <span>Our projects</span>
                    <h2>Discover our diverse range of projects</h2>
                    <p>We offer a diverse array of construction services,spanning residential, commercial, and industrial projects.</p>  
                  </div>
                  <div className='row pt-4'>
                    <div className='col-md-4 col-lg-4'>
                      <div className='item'>
                        <div className='service-image'>
                          <img src={ConstructionImg} alt="" className='w-100'/>
                          </div>
                          <div className='service-body'>
                            <div className='service-title'>
                              <h3>Kolkata project</h3>
                            </div>
                            <div className='service-content'>
                              <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                            </div>
                            <a href="#" className='btn btn-primary small'>Read More</a>
                          </div>
                        
                      </div>
                    </div>
                        {/* gdggfdfgd */}
                    <div className='col-md-4 col-lg-4'>
                      <div className='item'>
                        <div className='service-image'>
                          <img src={ConstructionImg1} alt="" className='w-100'/>
                          </div>
                          <div className='service-body'>
                            <div className='service-title'>
                            <h3>Kolkata project</h3>
                            </div>
                            <div className='service-content'>
                              <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                            </div>
                            <a href="#" className='btn btn-primary small'>Read More</a>
                          </div>
                        
                      </div>
                    </div>
                      {/* ijicbcb */}
                    <div className='col-md-4 col-lg-4'>
                      <div className='item'>
                        <div className='service-image'>
                          <img src={ConstructionImg} alt="" className='w-100'/>
                          </div>
                          <div className='service-body'>
                            <div className='service-title'>
                            <h3>Kolkata project</h3>
                            </div>
                            <div className='service-content'>
                              <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                            </div>
                            <a href="#" className='btn btn-primary small'>Read More</a>
                          </div>
                        
                      </div>
                    </div>
                    {/* sdfsdffs */}
    
                    <div className='col-md-4 col-lg-4'>
                      <div className='item'>
                        <div className='service-image'>
                            <img src={ConstructionImg} alt="" className='w-100'/>
                        </div>
                          <div className='service-body'>
                            <div className='service-title'>
                              <h3>Kolkata project</h3>
                            </div>
                            <div className='service-content'>
                              <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                            </div>
                            <a href="#" className='btn btn-primary small'>Read More</a>
                          </div>
                        
                      </div>
                    </div>
                    {/* dasdasd */}
                    <div className='col-md-4 col-lg-4'>
                      <div className='item'>
                        <div className='service-image'>
                          <img src={ConstructionImg} alt="" className='w-100'/>
                        </div>
                          <div className='service-body'>
                            <div className='service-title'>
                              <h3>Kolkata project</h3>
                            </div>
                            <div className='service-content'>
                              <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                            </div>
                            <a href="#" className='btn btn-primary small'>Read More</a>
                          </div>
                        
                      </div>
                    </div>
                    {/* dasdasd */}
                    <div className='col-md-4 col-lg-4'>
                      <div className='item'>
                        <div className='service-image'>
                          <img src={ConstructionImg} alt="" className='w-100'/>
                        </div>
                          <div className='service-body'>
                            <div className='service-title'>
                              <h3>Kolkata project</h3>
                            </div>
                            <div className='service-content'>
                              <p>Specialty construction is a niche sector within the construction industry that focuses on projects requiring specialized skills, materials, and techniques.</p>
                            </div>
                            <a href="#" className='btn btn-primary small'>Read More</a>
                          </div>
                      </div>
                    </div>
                    {/* dasdasd */}
                    
                  </div>
                </div>
              </section>
    <Footer/>
    </>
  )
}

export default Projects
