import axios from "axios";

const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "https://spring-97bs.onrender.com";

export const getAllNews = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(
      `${backendUrl}/api/news?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const fetchNewsByCategory = async (categoryTitle) => {
  try {
    const response = await axios.get(
      `https://spring-97bs.onrender.com/api/news/category?category=${categoryTitle}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching news by category:", error);
    throw error;
  }
};
export const getSingleNews = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/news/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteNews = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${backendUrl}/api/news/${slug}`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateNews = async ({ updatedData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("document", JSON.stringify(updatedData));

    if (updatedData.image instanceof File) {
      formData.append("image", updatedData.image);
    }

    const { data } = await axios.put(
      `${backendUrl}/api/news/${slug}`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createNews = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${backendUrl}/api/news`, {}, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
