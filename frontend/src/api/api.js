import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

const apiUrl = "https://audioquorum-api.herokuapp.com/api";

export const signupPost = async (formData) => {
  try {
   
    const {data} = await axios.post(apiUrl + "/admin/user/create", formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}` 
        }});
    console.log(data);
    if (data) {
        return (data);
    }
  } catch (err) {
    return err.message;
  }
};
export const loginPost = async (formData) => {
  try {
    const { data } = await axios.post(apiUrl + "/auth/login", formData);
    console.log(data);

    if (data) {
      return data;
    }

  } catch (err) {
    return err.message;
  }
};

export const logoutPut = async (token) => {
  try {
    const { data } = await axios.put(apiUrl + "/auth/logout", token, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    if (data) {
      return data;
    }
  } catch (err) {
    throw err;
  }
};