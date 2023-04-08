import React, { useState } from 'react';
import { Params, useParams } from 'react-router-dom';

const Reservation = () => {
    const { movieTitle, showtime }: Readonly<Params<string>> = useParams();

    // Create state for the list of selected items
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Define a click handler for the grid items
    function clickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const item = event.currentTarget;
        const itemId = item.dataset.id;

        // Check if the item is already selected
        if (selectedItems.includes(itemId!)) {
            // If it is, remove it from the list and reset the background color
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
            item.classList.remove('bg-[#FCD34D]');
        } else {
            // If it isn't, add it to the list and set the background color
            setSelectedItems([...selectedItems!, itemId!]);
            item.classList.add('bg-[#FCD34D]');
        }
    }

    // Create an array of grid items
    const gridItems = [];
    for (let i = 0; i < 48; i++) {
        gridItems.push(
            <div
                key={i}
                data-id={`item-${i}`}
                className="bg-[#A94545] h-[2rem] w-[2rem] cursor-pointer"
                onClick={clickHandler}
            ></div>
        );
    }

    return (
        <div className="p-3 flex justify-center">
            <div className="w-[60vw] h-[80vh] bg-gray-100 p-[5rem] relative">
                <div className="grid grid-cols-[20%,80%] gap-20">
                    <div className="bg-black w-[10rem] h-[10rem]"></div>
                    <p className="text-center w-full text-4xl flex items-center justify-center">
                        {movieTitle}
                    </p>
                </div>
                <div className="gap-2 grid grid-cols-12 auto-rows-[3rem] mt-[3rem] items-center">
                    {gridItems}
                </div>
                <div className="mt-6">
                    <p className="text-lg font-semibold">Selected Items:</p>
                    <ul className='flex gap-2 font-medium'>
                        {selectedItems.map((itemId) => (
                            <li key={itemId}>{itemId}</li>
                        ))}
                    </ul>
                </div>
                <button className="btn btn-active btn-primary absolute bottom-3 right-3">ยืนยัน</button>
            </div>
        </div>
    );
};

export default Reservation;
