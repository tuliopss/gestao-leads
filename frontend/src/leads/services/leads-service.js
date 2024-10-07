import { apiUrl, requestConfig } from "../../utils/api-config";

const getAllLeads = async () => {
  const config = requestConfig("GET", null);

  try {
    const response = await fetch(`${apiUrl}/leads`, config);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const createLead = async (lead) => {
  const config = requestConfig("POST", lead);

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
  createLead,
};

export default leadsService;
