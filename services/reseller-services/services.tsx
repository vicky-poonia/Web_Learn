import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const pageLimit = 10;

export const Keyword = async ( key_data,result,user_id) => {
  if (process.env.NEXT_PUBLIC_SEARCH_KEYWORD_CAPTURE_ENABLED?.toLowerCase() !== "true") 
    return;
  try {
    if (key_data.length !== 0 && key_data.length <= 30) {
    const response = await axios.post(`${baseUrl}/courses/keyword`, {
        keyword: {
          keyword:key_data.toLowerCase(),
          location: 'web',
          result:result,
          user_id:user_id
        },
      }
    );
    return response.data;
    }
  } catch (error) {}
};

export const sendTokenEmail = async (formData) => {
  try {
    return await axios.post(baseUrl + "/auth/password/forgot", formData);
  } catch (error) {}
};

export const resetPassword = async (formData) => {
  try {
    return await axios.post(baseUrl + "/auth/password/reset", formData);
  } catch (error) {}
};

export const resetPasswordActive = async (formData) => {
  try {
    return await axios.post(baseUrl + "/auth/password/reset/active", formData);
  } catch (error) {}
};

export const resellerRegister = async (formData) => {
  try {
    return await axios.post(baseUrl + "/auth/register/reseller", formData);
  } catch (error) {}
};

export const resellerLogin = async (formData) => {
  const returnData = {
    data: null,
    status: false,
    msg: "",
  };
  try {
    const response = await axios.post(baseUrl + "/auth/login/reseller", formData);
    if (response.data.data && response.data.data.user_id) {
      returnData.data = response.data;
      returnData.status = true;
      returnData.msg = "LoggedIn Successfull.";
    } else {
      returnData.msg = response.data.message;
    }
    return returnData;
  } catch (error) {
    return returnData;
  }
};
