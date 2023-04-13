import React, { useEffect, useState } from 'react';
import useSWR from 'swr'
import { Link, useLocation } from 'react-router-dom';
import { allSeat } from '../mocks/seat';
import { Movie, Seat, Showtime } from '../types/responses';
import { fetchJSON } from '../utils';

const Reservation = () => {
    const movie: Movie = useLocation().state.movie
    const showtime: Showtime = useLocation().state.showtime
    useEffect(() => {
        console.log(showtime)
    }, [showtime])
    const { data: seats, error } = useSWR<Seat[]>(`/api/reservation/${movie.id}/${showtime.id}`, fetchJSON)
    useEffect(() => {
        console.log(seats)
    }, [seats])
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    function clickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = event.target as HTMLDivElement;
        const itemId = target.dataset.id!;
        const itemIndex = selectedItems.indexOf(itemId);
        if (itemIndex === -1) {
            target.style.backgroundColor = '#986AD3';
            setSelectedItems([...selectedItems, itemId]);
        } else {
            target.style.backgroundColor = '#A94545'
            setSelectedItems(selectedItems.filter((item) => item !== itemId));
        }
    }

    return (
        <div className="p-3 flex justify-center">
            <div className="w-[60vw] h-[80vh] bg-gray-100 p-[5rem] relative">
                <div className="grid grid-cols-[20%,80%] gap-20">
                    <div className="bg-black w-[10rem] h-[10rem]"></div>
                    <p className="text-center w-full text-4xl flex items-center justify-center">
                        {movie.title}
                    </p>
                </div>
                <div className="gap-2 grid grid-cols-12 auto-rows-[3rem] mt-[3rem] items-center">
                    {error && <p>{error.toString()}</p>}
                    {!seats && <p>Loading</p>}
                    {seats && seats.map((seat, id) => {
                        return <div
                            key={seat.seat_id}
                            data-id={seat.seat_id}
                            className='h-[2rem] w-[2rem] cursor-pointer'
                            onClick={seat.is_available ? clickHandler : undefined}
                            style={{backgroundColor: seat.is_available ? '#A94545' : '#986AD3'}}
                        ></div>
                    })}
                </div>
                <div className="mt-6">
                    <p className="text-lg font-semibold">Selected Items:</p>
                    <ul className='flex gap-2 font-medium'>
                        {selectedItems.map((itemId) => (
                            <li key={itemId}>{itemId}</li>
                        ))}
                    </ul>
                </div>
                <Link to={`/movie/confirm`} state={{ seat: selectedItems, movie: movie, showtime: showtime }}>
                    <button className="btn btn-active btn-primary absolute bottom-3 right-3">ยืนยัน</button>
                </Link>

            </div>
        </div>
    );
};

export default Reservation;
