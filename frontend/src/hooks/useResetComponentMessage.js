// import { resetMessage } from "../salespersons/slices/salesperson-slice";

import { resetMessage } from "../utils/global-messages-slices";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000); // 2 segudos
  };
};
