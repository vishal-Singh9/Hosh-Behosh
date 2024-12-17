import React from 'react';
import EventCard from './EventCard';
import { useNavigate } from 'react-router-dom';



const Events = (restaurantId) => {
  const eventsData = [
    { id: 1, restaurantId: {restaurantId}, name: "Indian Fast Food" },
    { id: 2, restaurantId: "124", name: "Mexican Fiesta" },
    { id: 3, restaurantId: "125", name: "Italian Night" },
    { id: 4, restaurantId: "126", name: "BBQ Bonanza" },
  ];
  const navigate = useNavigate();

  const handleEventClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {eventsData.map((event) => (
        <EventCard 
          key={event.id} 
          restaurantId={event.restaurantId} 
          onClick={() => handleEventClick(event.restaurantId)}
        />
      ))}
    </div>
  );
};

export default Events;
