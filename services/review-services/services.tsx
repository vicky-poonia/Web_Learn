import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getReviews = async (course_id = "", rating, currentPage, per_page = 10) => {
  try {
    return await axios.get(baseUrl + "/users/feedback/courses", {
      params: {
        product_id: course_id,
        per_page: per_page,
        page: currentPage,
        rating: rating > 0 ? rating : "",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getReviewById = async (product_id, userData) => {
  try {
      return await axios.get(`${baseUrl}/users/feedback/courses/getReviewById?product_id=${product_id}`, {
          headers: { Authorization: userData.data.token },
      });
  } catch (error) {
      console.error(error);
  }
};


export const saveAfterSignupDetails = async (values) => {
  try {
    if (values.update) {
      return true;
    }
    const { about_us, user_id, skills, certifications, time_period, other_certification, other_skills, profile_hire } = values;
    const url = `${baseUrl}/users/dashboard/aftersignup_details`;
    await axios.post(url, {
      about_us, user_id, certifications, skills, time_period, other_certification, other_skills, profile_hire,
    });
  } catch (e) {
    console.error(e);
  }
};
export const storeReviews = async (formData) => {
  try {
    return await axios.post(baseUrl + "/users/feedback/courses", formData);
  } catch (error) {
    console.error(error);
  }
};

export const storeComments = async (formData) => {
  try {
    return await axios.post(baseUrl + "/users/feedback/courses/response", formData);
  } catch (error) {
    console.error(error);
  }
};

export const getAllCoursesList = async () => {
  try {
    return await axios.get(baseUrl + "/courses/search");
  } catch (error) {
    console.error(error);
  }
};

export const getCourseRatings = async (course_id) => {
  try {
    return await axios.get(baseUrl + "/users/feedback/courses/ratings", {
      params: {
        product_id: course_id || "",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getVideoRatings = async (course_id) => {
  try {
    return await axios.get(baseUrl + "/users/feedback/web", {
      params: {
        product_id: course_id,
        per_page: 10,
        page: 1,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSingleCourse = async (slug) => {
  try {
    return await axios.get(baseUrl + "/courses", {
      params: {
        slug: slug,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateDownloadWhizCardStatus = async (course_id, email) => {
  try {
    const data = {
      course_id,
      email,
      type: "website",
    };

    return await axios.post(`${baseUrl}/users/dwonload-whizcard`, data);
  } catch (error) {
    console.error(error);
  }
};

export const getWhizCardDetail = async (courseId, tk) => {
  try {
    let config: any = {
      method: "get",
      url: `${baseUrl}/quiz/pratice_test/getwhizcardinfo?course_id=${courseId}`,
      headers: {
        authorization: tk,
      },
    };

    const resp = await axios(config);
    return resp.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getwhizcardstatus = async (courseId) => {
  try {
    let res = await axios.get(
      `${baseUrl}/quiz/pratice_test/getwhizcardstatus?course_id=${courseId}`
    );
    return res.data;
  } catch (err) {}
};


export const getSandboxPageContent = async (task_slug) => {
  let playUrl = process.env.NEXT_PUBLIC_PLAY_URL_PYTHON;
  try {
    let data = {sandbox_slug: task_slug}

      let res = await axios.post(`${playUrl}/api/web/play-sandbox/play-get-aws-sandbox-content`,data);
      return res.data
  }
  catch(e)
  {
    console.error(e)
  }
}

export const SendAmazonlink = async (email) =>{
  try{
    const resp = await axios.get(`${baseUrl}/auth/register/amazon/resend/?email=${email}`).then((resp)=>{
      if(resp.data.status === "success")
      {
        return true
      }
    })
  
  }
  catch(e){

  }
}