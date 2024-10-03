import { apiUrl, requestConfig } from "../../utils/api-config";

const getAllSalesPersons = async () => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(`${apiUrl}/salespersons`, config);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const registerSalesPerson = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(`${apiUrl}/salespersons`, config);

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const salesPersonService = {
  getAllSalesPersons,
  registerSalesPerson,
};

export default salesPersonService;
