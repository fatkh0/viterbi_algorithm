import { useQueryClient } from "react-query";
import { GetCoded, ViterbiService } from "../../services/viterbi.service";

export function useGetCode() {
  const queryClient = useQueryClient();

  return async (impRsp: string, message: string): Promise<GetCoded> => {
    return await queryClient.fetchQuery(
      ["getCoded", impRsp, message],
      async () => await ViterbiService.getCoded(impRsp, message)
    );
  };
}
