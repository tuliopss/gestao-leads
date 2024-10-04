import { apiUrl, requestConfig } from "../../utils/api-config";

const getAllProducts = async () => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(`${apiUrl}/products`, config);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const productsService = {
  getAllProducts,
};

export default productsService;
