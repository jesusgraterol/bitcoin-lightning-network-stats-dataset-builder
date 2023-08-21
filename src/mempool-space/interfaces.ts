




// Service
export interface IMempoolSpaceService {
    // Properties
    // ...

    // Retrievers
    get_lightning_network_stats(): Promise<ILightningNetworkStatRecord[]>
}




// Stats Record
export interface ILightningNetworkStatRecord {
    // The timestamp in seconds when the record was added (Must be converted to ms prior to storing)
    added: number,

    // The total number of channels available
    channel_count: number,

    // The total capacity of the network in BTC
    total_capacity: number,

    // The total number of nodes running the lightning network over TOR (Anonymous)
    tor_nodes: number,

    // The total number of nodes exposing their public IP
    clearnet_nodes: number,

    // An unannounced node can only be seen by the parties that are involved in the channel
    unannounced_nodes: number,

    /**
     * Nodes running an implementation of Lightning in a dual stack environment making 
     * some features public and others private
     */
    clearnet_tor_nodes: number
}