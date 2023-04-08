import { useLocation } from "react-router-dom"
import Ticket from "../components/Ticket"

const Summary = () => {
    const selectedSeat: string[] = useLocation().state.selectedSeat
    const title: string = useLocation().state.title
    const showtime = useLocation().state.showtime

    return (
        <div className="p-3 flex justify-center">
            <div className="w-[50vw] h-[80vh] bg-gray-100 p-[5rem] relative">
                <p className="w-full flex justify-center text-4xl">Success</p>
                <div className="mt-10">
                    {selectedSeat.map((seat, id) => {
                        return <Ticket title={title} seat={seat} showtime={showtime}/>
                    })}
                </div>
                <button className="btn btn-active btn-primary absolute bottom-3 right-3">Print</button>
            </div>
        </div>
    )
}

export default Summary