import { DatasetBuilderService } from "./dataset-builder";

// Print the script title
console.log("BITCOIN LIGHTNING NETWORK STATS DATASET BUILDER");
console.log(" ");

// Start the syncing process
new DatasetBuilderService()
.sync()
.then(_ => {
    console.log("\nThe dataset has been synced successfully");
    process.exit(0);
} )
.catch(e => {
    console.error(e);
    process.exit(1);
});