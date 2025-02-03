import { formatBidTime, formatUsageTime } from "../helpers/formatTime";

/* eslint-disable react/prop-types */
const ProductInfoComp = (props) => {
  const key = props.prodKey;
  const value = props.value;
  switch (key) {
    case "brand_name":
    case "model_name":
    case "operating_system":
    case "product_color":
    case "desc":
    case "cpu":
      return <td className="py-2 px-4 text-xl font-bold">{value}</td>;
    case "ram_storage":
    case "rom_storage":
      return <td className="py-2 px-4 text-xl font-bold">{value} GB</td>;
    case "rear_camera":
    case "front_camera":
      return <td className="py-2 px-4 text-xl font-bold">{value} MP</td>;
    case "screen_size":
      return <td className="py-2 px-4 text-xl font-bold">{value} inch</td>;
    case "product_set_price":
    case "original_price":
      return (
        <td className="py-2 px-4 text-xl font-bold">
          ₹{value.toLocaleString()}
        </td>
      );
    case "usage_time":
      return (
        <td className="py-2 px-4 text-xl font-bold">
          {formatUsageTime(value)}
        </td>
      );
    case "bid_start_time":
      return (
        <td className="py-2 px-4 text-xl font-bold">{formatBidTime(value)}</td>
      );
    case "bid_time":
      return <td className="py-2 px-4 text-xl font-bold">{value}</td>;
    case "product_appeal":
      return (
        <td className="py-2 px-4 text-xl font-bold text-green-400">{value}</td>
      );
    case "highest_bid":
      return (
        <td className="py-2 px-4 text-xl font-bold text-green-400">₹{value}</td>
      );
    default:
      return (
        <td className="py-2 px-4 text-xl font-bold text-green-400">
          Nothing to be displayed ...{" "}
        </td>
      );
  }
};

export default ProductInfoComp;
