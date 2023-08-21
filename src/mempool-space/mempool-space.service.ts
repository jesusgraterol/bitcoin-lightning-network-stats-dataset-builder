import { 
    ExternalRequestService, 
    IExternalRequestOptions, 
    IExternalRequestResponse, 
    IExternalRequestService 
} from "../external-request";
import { IMempoolSpaceService, ILightningNetworkStatRecord } from "./interfaces";


export class MempoolSpaceService implements IMempoolSpaceService {
    // Mempool.space's Request Options Skeleton
    private readonly request_options: IExternalRequestOptions = {
        host: "mempool.space",
        path: "",
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }

    // External Request Service
    private _external_request: IExternalRequestService;

    
    constructor() {
        // Initialize the external request instance
        this._external_request = new ExternalRequestService();

        // ...
    }








    /**************
     * Retrievers *
     **************/






    /**
     * Retrieves the Bitcoin's Lightning Network statistics for the past 3 years.
     * Keep in mind the records come in DESCENDING ORDER by "added". Additionally,
     * this timestamp is in seconds. 
     * @returns Promise<ILightningNetworkStatRecord[]>
     */
    public async get_lightning_network_stats(): Promise<ILightningNetworkStatRecord[]> {
        // Send the request
        const response: IExternalRequestResponse = await this._external_request.request({
            ...this.request_options,
            path: "/api/v1/lightning/statistics/3y"
        });

        // Validate the response
        this.validate_request_response(response);

        // Validate the response's data
        if (!Array.isArray(response.data)) {
            console.log(response.data);
            throw new Error(`Mempool.space's API returned an invalid list of stat records. Received: ${typeof response.data}`);
        }
        if (!response.data.length) {
            throw new Error(`Mempool.space's API returned an empty list of stat records.`);
        }

        // Return the series
        return response.data;
    }















    /****************
     * Misc Helpers *
     ****************/
    



    /**
     * Given an HTTP Response object, it will ensure the request was 
     * processed correctly and has the correct status code.
     * @param response 
     */
    private validate_request_response(response: IExternalRequestResponse): void {
        // Ensure it is a valid object
        if (!response || typeof response != "object") {
            console.log(response);
            throw new Error("Mempool.space's API returned an invalid response object.");
        }

        // Ensure the status code is valid
        if (response.status_code != 200) {
            throw new Error(`Mempool.space's API returned an invalid HTTP response code. 
            Expected: 200, Received: ${response.status_code}`);
        }
    }
}