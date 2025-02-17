import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>

<h1 className='text-2xl sm:text-4xl font-bold mb-2'>About <span className='underline underline-offset-4 decoration-1 under font-light'>Our Cause</span></h1>

        <p className='text-gray-600 max-w-xl text-center mb-10 text-lg italic'>"No More Wasted Meals. No More Hungry Hearts ❤️"</p>

        <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20 bg-gradient-to-r from-red-100 to-yellow-100 p-10 rounded-xl shadow-xl'>
            <img src={assets.child} alt="" className='w-full sm:w-1/2 max-w-lg rounded-xl shadow-lg hover:scale-105 transition-transform duration-500' /> 
            <div className='flex flex-col items-center md:items-start mt-10 text-gray-700'>
                <div className='grid grid-cols-2 gap-6 md:gap-10 w-full mb-6'>
                    <div className='text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300'>
                        <p className='text-5xl font-bold text-red-500'>500+</p>
                        <p className='text-sm'>NGO Partnerships</p>
                    </div>
                    <div className='text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300'>
                        <p className='text-5xl font-bold text-orange-500'>1000+</p>
                        <p className='text-sm'>Communities Served</p>
                    </div>
                    <div className='text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300'>
                        <p className='text-5xl font-bold text-green-500'>5M+</p>
                        <p className='text-sm'>Meals Distributed</p>
                    </div>
                    <div className='text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300'>
                        <p className='text-5xl font-bold text-blue-500'>300+</p>
                        <p className='text-sm'>Active Volunteers</p>
                    </div>
                </div>
                <p className='my-6 max-w-lg text-center md:text-left text-lg leading-relaxed'>
                Our mission is to act as a crucial link between NGOs, communities, and food sources to ensure that excess food reaches those in need. By collaborating with restaurants, events, and households, we aim to minimize food wastage while addressing hunger in underprivileged areas. Our platform serves as a bridge that connects food donors with charitable organizations efficiently and effectively. Join us in our mission to create a sustainable, hunger-free society where food is shared, not wasted.
                </p>
                <button className='bg-gradient-to-r from-red-500 to-orange-400 text-white px-10 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300'>Learn More</button>
            </div>

        </div>

    </div>
  )
}

export default About
