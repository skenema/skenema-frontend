import { useParams } from "react-router-dom";
import useSWR from "swr";
import { FetchJSONError, fetchJSON, getCustomDateFormat } from "../utils";
import { APIError, TicketValidationResponse } from "../types/responses";

const TicketValidation = () => {
  const params = useParams();
  const ticketId = params.ticketId;
  const { data, error } = useSWR<
    TicketValidationResponse,
    FetchJSONError<APIError>
  >(`/api/ticket/validate-ticket?ticketId=${ticketId}`, fetchJSON);
  if (error && error instanceof FetchJSONError) {
    return <div>Your ticket has error: {error.info.message}</div>;
  }
  if (!data && !error) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-8 flex">
      <div className="m-auto p-8">
        <h1 className="text-xl text-center font-bold">Your ticket is valid!</h1>
        <table className="table result-table">
          <tbody>
            <tr>
              <td>Cinema</td>
              <td>{data?.cinema}</td>
            </tr>
            <tr>
              <td>Seat</td>
              <td>{data?.seatNumber}</td>
            </tr>
            <tr>
              <td>Showtime</td>
              <td>{data && getCustomDateFormat(new Date(data.showtime))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketValidation;
