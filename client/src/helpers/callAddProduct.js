import {
  PROD_LAPTOP_ADD,
  PROD_MOBILE_ADD,
  PROD_WATCH_ADD,
} from "../backendapi";

export const callAddProducts = async (category, details) => {
  if (category === "mobile") {
    if (
      !details.brand_name ||
      !details.model_name ||
      !details.ram_storage ||
      !details.rom_storage ||
      !details.operating_system ||
      !details.rear_camera ||
      !details.front_camera ||
      !details.product_color ||
      !details.screen_size ||
      !details.set_price ||
      !details.original_price ||
      !details.title ||
      !details.usage_time ||
      !details.bid_start_time ||
      !details.bid_time ||
      !details.cpu
    ) {
      return alert("enter all mandatory fields");
    }
    try {
      await fetch(PROD_MOBILE_ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          brand_name: details.brand_name,
          model_name: details.model_name,
          ram_storage: details.ram_storage,
          rom_storage: details.rom_storage,
          operating_system: details.operating_system,
          rear_camera: details.rear_camera,
          front_camera: details.front_camera,
          product_color: details.product_color,
          screen_size: details.screen_size,
          set_price: parseInt(details.set_price),
          original_price: parseInt(details.original_price),
          title: details.title,
          description: details.desc,
          usage_time: details.usage_time,
          bid_start_time: details.bid_start_time,
          product_appeal: details.product_appeal,
          bid_time: details.bid_time,
          cpu: details.cpu,
        }),
      })
        .then(() => alert("product added!!!"))
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  } else if (category === "laptop") {
    if (
      !details.brand_name ||
      !details.model_name ||
      !details.ram_storage ||
      !details.rom_storage ||
      !details.operating_system ||
      !details.product_color ||
      !details.screen_size ||
      !details.set_price ||
      !details.original_price ||
      !details.title ||
      !details.usage_time ||
      !details.bid_start_time ||
      !details.bid_time ||
      !details.cpu
    ) {
      return alert("enter all mandatory fields");
    }
    try {
      await fetch(PROD_LAPTOP_ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          brand_name: details.brand_name,
          model_name: details.model_name,
          ram_storage: details.ram_storage,
          rom_storage: details.rom_storage,
          operating_system: details.operating_system,
          product_color: details.product_color,
          screen_size: details.screen_size,
          set_price: parseInt(details.set_price),
          original_price: parseInt(details.original_price),
          title: details.title,
          description: details.desc,
          usage_time: details.usage_time,
          bid_start_time: details.bid_start_time,
          product_appeal: details.product_appeal,
          bid_time: details.bid_time,
          cpu: details.cpu,
        }),
      })
        .then(() => alert("product added"))
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  } else if (category === "watch") {
    if (
      !details.brand_name ||
      !details.model_name ||
      !details.product_color ||
      !details.set_price ||
      !details.original_price ||
      !details.title ||
      !details.usage_time ||
      !details.bid_start_time ||
      !details.bid_time ||
      !details.is_digital ||
      !details.diameter
    ) {
      return alert("enter all mandatory fields");
    }
    try {
      await fetch(PROD_WATCH_ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          brand_name: details.brand_name,
          model_name: details.model_name,
          product_color: details.product_color,
          diameter: details.diameter,
          is_digital:details.is_digital,
          is_calling_avialable: parseInt(details.is_calling_avialable),
          have_fitness_tracker: parseInt(details.have_fitness_tracker),
          set_price: parseInt(details.set_price),
          original_price: parseInt(details.original_price),
          title: details.title,
          description: details.desc,
          usage_time: details.usage_time,
          bid_start_time: details.bid_start_time,
          product_appeal: details.product_appeal,
          bid_time: details.bid_time,
        }),
      })
        .then(() => alert("product added"))
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }
};
