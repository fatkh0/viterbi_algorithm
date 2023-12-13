import { useQueryClient } from "react-query";
import { ViterbiService } from "../../services/viterbi.service";

type NextStepSequence = string;

export function useGetNextStep() {
  const queryClient = useQueryClient();

  return async (): Promise<NextStepSequence> => {
    return await queryClient.fetchQuery(
      ["getNextStep"],
      async () => await ViterbiService.getNextStep()
    );
  };
}
