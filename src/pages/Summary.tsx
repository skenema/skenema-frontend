import { useLocation } from "react-router-dom";
import Ticket from "../components/Ticket";
import { Showtime } from "../types/responses";
import TicketSheet from "../components/TicketSheet";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

function printPage() {
  window.print();
}

const Summary = () => {
  const selectedSeat: number[] = useLocation().state.selectedSeat;
  const title: string = useLocation().state.title;
  const showtime: Showtime = useLocation().state.showtime;
  const printRef = useRef(null);

  // TODO: Use returned ticket from API instead

  return (
    <div className="p-3 flex justify-center">
      <div className="w-[50vw] bg-gray-100 p-[5rem] relative">
        <p className="w-full flex justify-center text-4xl">Success</p>
        <p className="text-center text-warning bg-black">
          Please print or screenshot this page because you will not see it
          again.
        </p>
        <div className="mt-10">
          <TicketSheet
            ref={printRef}
            seats={selectedSeat}
            title={title}
            showtime={showtime.start_time}
          />
        </div>
        <ReactToPrint
          trigger={() => (
            <button
              onClick={printPage}
              className="btn btn-active btn-primary absolute bottom-3 right-3"
            >
              Print
            </button>
          )}
          content={() => printRef.current}
        />
      </div>
    </div>
  );
};

export default Summary;
