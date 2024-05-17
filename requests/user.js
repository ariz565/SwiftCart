import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
      user_id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const saveAddress = async (address, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveAddress", {
      address,
      user_id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete("/api/user/manageAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const applyCoupon = async (coupon) => {
  const { data } = await axios.post("/api/user/applyCoupon", {
    coupon,
  });
  return data;
};
