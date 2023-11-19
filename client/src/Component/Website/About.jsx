import React, { useEffect } from 'react'
import '../CSS/about.css'
import Malath from '../Images/Malath.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    return (
        <>

            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    integrity="sha512-...."
                    crossOrigin="anonymous"
                />
            </head>

            {/* HERO SECTION  */}
            <div className="relative bg-cover bg-center h-[40rem] mb-48" style={{ backgroundImage: 'url("https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">About US Page</h1>
                        <p className="text-lg sm:text-xl md:text-2xl">Discover our innovative solutions to your problems.</p>
                    </div>
                </div>
            </div>
            {/* END HERO SECTION  */}



            {/* ABOUT US CARD SECTION  */}
            <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl mb-52 ">

                <div className="w-full h-96 lg:w-1/2 lg:h-auto ">
                    <img
                        className=" h-[35rem] w-full object-cover"
                        src="https://images.pexels.com/photos/8994766/pexels-photo-8994766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Winding mountain road"
                    />
                </div>
                <div className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">

                    <div className="flex flex-col p-12 md:px-16">
                        <h2 className="text-2xl font-medium uppercase text-[#219C90]  lg:text-4xl">
                            Winding Mountain Road
                        </h2>
                        <p className="mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat.
                        </p>

                        <div className="mt-8">
                            <a
                                href="#"
                                className="inline-block w-full text-center text-lg font-medium text-gray-100 bg-[#219C90]  rounded-lg  py-4 px-10 hover:bg-blue-600 hover:shadow-md md:w-48"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* END  ABOUT US CARD SECTION  */}



            {/* OUR TEAM SECTION  */}
            <div className="our-team-section">

                <div className="grid grid-cols-2 items-center gap-5 md:gap-20 md:mx-28">

                    <div className="our-team">
                        <div className="pic">
                            <img src={Malath}
                                className='img1 h-10' />
                        </div>
                        <div className="team-content">
                            <h3 className="title">Malath Yasin</h3>
                            <span className="post">Frontend Web Developer </span>
                        </div>
                        <ul className="social">

                            <li>
                                <a href="#" target="_blank">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="our-team">
                        <div className="pic">
                            <img src="https://media.licdn.com/dms/image/D5603AQF1XfApjVnn2Q/profile-displayphoto-shrink_800_800/0/1691007059776?e=1704931200&v=beta&t=pmjG4BUTojnK5GxsdTC2Mvg2WGi_HT0qDAU7FiPp1iQ"
                                className='img2' />

                        </div>
                        <div className="team-content">
                            <h3 className="title">Osama Taani</h3>
                            <span className="post">Backend Web Developer </span>
                        </div>
                        <ul className="social">

                            <li>
                                <a href="#" target="_blank">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
            {/* END OUR TEAM SECTION  */}





        </>
    )
}

export default About