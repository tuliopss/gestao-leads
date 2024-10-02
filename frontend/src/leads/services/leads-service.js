import { apiUrl, requestConfig } from "../../utils/api-config";

const getAllLeads = async () => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(`${apiUrl}/leads`, config);
    console.log("oi", response);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const leadsService = {
  getAllLeads,
};

export default leadsService;
