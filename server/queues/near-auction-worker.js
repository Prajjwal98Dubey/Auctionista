import { Worker } from "bullmq";
import {
  updateHighestBidCommonProductByQueue,
  updateHighestBidSpecificProductByQueue,
} from "./queueFunctions.js";

const startTimerofProduct = (prod) => {
  let currentTime = Date.now();
  let delay =
    new Date(bid_start_time).getTime() +
    bid_time * 60 * 60 * 1000 -
    currentTime;
  console.log(
    "processing product which are going to be auctioned",
    prod.product_title
  );
  setTimeout(() => {
    updateHighestBidCommonProductByQueue(prod.product_id);
    updateHighestBidSpecificProductByQueue(prod.product_id, prod.category);
  }, delay);
};

const nearAuctionWorker = new Worker(
  "near-auction-products",
  (job) => {
    startTimerofProduct(job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);
