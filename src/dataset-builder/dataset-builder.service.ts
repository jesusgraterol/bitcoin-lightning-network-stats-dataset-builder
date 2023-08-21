import * as fs from "fs";
import * as path_helper from "path";
import { 
    MempoolSpaceService, 
    IMempoolSpaceService, 
    ILightningNetworkStatRecord 
} from "../mempool-space";
import { IDatasetBuilderService } from "./interfaces";


export class DatasetBuilderService implements IDatasetBuilderService {
    // The path in which the dataset will be stored
    private readonly dataset_path: string = "./output/dataset.csv";

    // Mempool Space Service
    private _mempool_space: IMempoolSpaceService;


    constructor() {
        // Initialize the Mempool Space Instance
        this._mempool_space = new MempoolSpaceService();

        // Initialize the Dataset File
        this.initialize_dataset_file();
    }







    /****************
     * Sync Process *
     ****************/







    /**
     * Executes a full dataset sync until it is up-to-date with the network.
     * @returns Promise<void>
     */
    public async sync(): Promise<void> {
        // Firstly, load the dataset file
        let { latest_timestamp, raw_dataset } = this.load_dataset_file();

        // Retrieve the records from mempool.space's API
        const new_records: ILightningNetworkStatRecord[] = await this.get_dataset_items(latest_timestamp);

        // Store the new records - if any
        if (new_records.length) {
            // If the file is currently empty, add the heading
            if (!raw_dataset.length) raw_dataset = `${Object.keys(new_records[0]).join(",")}`;

            // Add the new records to the raw dataset
            raw_dataset += new_records.reduce(
                (accum: string, current_value: ILightningNetworkStatRecord) => accum + `\n${Object.values(current_value).join(",")}`,
                ""
            );

            // Update the dataset file
            this.update_dataset_file(raw_dataset);
        } else {
            console.log("No new records");
        }
    }





    /**
     * Retrieves the stat records for the last 3 years, formats the timestamps
     * and returns the records that have not been included in the dataset.
     * Keep in mind that this function may return an empty list.
     * @param latest_timestamp 
     * @returns Promise<ILightningNetworkStatRecord[]>
     */
    private async get_dataset_items(latest_timestamp: number): Promise<ILightningNetworkStatRecord[]> {
        // Firstly, retrieve the raw records
        let records: ILightningNetworkStatRecord[] = await this._mempool_space.get_lightning_network_stats();

        // Sort the records in ascending order by timestamp
        records.sort((a, b) => a.added - b.added);

        // Finally, convert the timestamps to milliseconds and return those records that have not yet been included
        return records
            .map((rec) => { return {...rec, added: rec.added * 1000 } } )
            .filter((rec) => rec.added > latest_timestamp);
    }




















    /***********************
     * File System Helpers *
     ***********************/





    /**
     * Initializes the dataset file in case it hadn't been.
     */
    private initialize_dataset_file(): void {
        // Only proceed if the dataset file does not exist
        if (!this.path_exists(this.dataset_path)) {
            // Check if the directory needs to be created
            const dir_name: string = path_helper.dirname(this.dataset_path);
            if (!this.path_exists(dir_name)) fs.mkdirSync(dir_name);

            // Create the csv file
            this.update_dataset_file("");
        }
    }



    /**
     * Updates the dataset file with the latest state.
     * @param new_data_state
     */
    private update_dataset_file(new_data_state: string): void {
        fs.writeFileSync(this.dataset_path, new_data_state, "utf-8");
    }




    /**
     * Verifies if a given directory or file exists.
     * @returns boolean
     */
    private path_exists(file_or_dir_path: string): boolean {
        try {
            fs.accessSync(file_or_dir_path);
            return true;
        } catch (e) { return false }
    }





    /**
     * Loads the dataset file and returns it in string format. It also
     * derives the latest record's timestamp so the syncing can be resumed.
     * @returns { latest_timestamp: number, raw_dataset: string }
     */
    private load_dataset_file(): { latest_timestamp: number, raw_dataset: string } {
        // Load the raw data
        const raw_dataset: string = fs.readFileSync(this.dataset_path).toString();

        // If the file contains data, derive the dataset height
        if (raw_dataset.length) {
            return { 
                latest_timestamp: Number(raw_dataset.split("\n").at(-1)!.split(",")[0]), 
                raw_dataset: raw_dataset 
            }
        }

        // Otherwise, return the defaults
        else { return { latest_timestamp: 0, raw_dataset: "" } }
    }















    /****************
     * Misc Helpers *
     ****************/





}