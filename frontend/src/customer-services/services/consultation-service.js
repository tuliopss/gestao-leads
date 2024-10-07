import { apiUrl, requestConfig } from "../../utils/api-config";

const getAllConsultations = async () => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(`${apiUrl}/customer-services`, config);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const createConsultation = async (consultation) => {
  const config = requestConfig("POST", consultation);

  try {
    const response = await fetch(`${apiUrl}/customer-services`, config);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const consultationsService = {
  getAllConsultations,
  createConsultation,
};

export default consultationsService;
