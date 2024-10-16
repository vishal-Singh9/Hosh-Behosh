import React from 'react'
import EventCard from './EventCard'

const Events = () => {
  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
        {
            [1,2,3,4].map((item)=>(
                <EventCard key={item} />
            ))
        }
      
    </div>
  )
}

export default Events
