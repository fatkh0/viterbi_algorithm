import { useQueryClient } from "react-query";
import { ViterbiService } from "../../services/viterbi.service";

type DecodedSequence = string;

export function useGetDecode() {
  const queryClient = useQueryClient();

  return async (errors: string): Promise<DecodedSequence> => {
    return await queryClient.fetchQuery(
      ["getDecoded", errors],
      async () => await ViterbiService.getDecoded(errors)
    );
  };
}
