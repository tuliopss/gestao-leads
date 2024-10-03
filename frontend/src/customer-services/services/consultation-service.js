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

const consultationsService = {
  getAllConsultations,
};

export default consultationsService;
