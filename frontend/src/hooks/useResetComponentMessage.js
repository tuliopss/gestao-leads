import { resetMessage } from "../salespersons/slices/salesperson-slice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    console.log("Mensagem será resetada em 2 segundos"); // Log para verificar se está sendo disparado
    setTimeout(() => {
      dispatch(resetMessage());
      console.log("Mensagem resetada"); // Log para garantir que o reset aconteceu
    }, 2000); // 2 segundos
  };
};
