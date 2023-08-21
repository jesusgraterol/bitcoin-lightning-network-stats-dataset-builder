# Bitcoin Lightning Network Stats Dataset Builder

The dataset builder script extracts Bitcoin's Lightnining Network statistics through Mempool.space's public API. The data is stored in a .csv file, facilitating its use in data science and machine learning projects.

The dataset file (updated quarterly) is hosted in Kaggle and can be downloaded from the following URL:

[https://www.kaggle.com/datasets/jesusgraterol/bitcoin-lightning-network-stats-dataset](https://www.kaggle.com/datasets/jesusgraterol/bitcoin-lightning-network-stats-dataset)



#
## Requirements

- NodeJS: ^v18.17.0

- NPM: ^v9.6.7

- Typescript: ^v5.1.6

**NOTE**: the versions listed above are the ones used to code the script. It may run on older|newer versions.




#
## Project Structure

```
bitcoin_lightning_network_stats_dataset_builder/
└───dist/
    ├──...
    node_modules/
    ├──...
    output/
    ├──dataset.csv <- Dataset File
    src/
    ├──...
    .gitignore
    package-lock.json
    package.json
    README.md
    tsconfig.json
```




#
## Getting Started

Install dependencies with:

`npm install`

Initialize the syncing process with:

`npm start`

**NOTE**: if the syncing execution were to fail and stop for any reason, it can be executed again without the risk of corrupting the dataset. Additionally, if your project requires a fresh dataset frequently, download the pruned file from [Kaggle](https://www.kaggle.com/datasets/jesusgraterol/bitcoin-lightning-network-stats-dataset) and place it in the output directory.




#
## Dataset Schema

The goal of this dataset builder is to collect essential data that reflects the activity & evolution of the network throughout time.

If you're going to use this dataset to train machine learning models, take into consideration that some of its fields need to be normalized. In case of any doubts, feel free to ask through the Github Issues section, and I'll get back to you as soon as I can.

| Name | Type | Description
| ---- | ---- | -----------
| added | int | The timestamp in milliseconds when the record was added.
| channel_count | int | The total number of channels available.
| total_capacity | int | The total capacity of the network in BTC.
| tor_nodes | int | The total number of nodes running the lightning network over TOR (Anonymous).
| clearnet_nodes | int | The total number of nodes exposing their public IP.
| unannounced_nodes | int | An unannounced node can only be seen by the parties that are involved in the channel.
| clearnet_tor_nodes | int | Nodes running an implementation of Lightning in a dual stack environment making some features public and others private.






#
## Unit Tests

Since the dataset file is deeply analyzed in Jupyter|Kaggle Notebooks, no unit tests were written. If you wish to see more details regarding this dataset, please visit:

[https://www.kaggle.com/datasets/jesusgraterol/bitcoin-lightning-network-stats-dataset](https://www.kaggle.com/datasets/jesusgraterol/bitcoin-lightning-network-stats-dataset)