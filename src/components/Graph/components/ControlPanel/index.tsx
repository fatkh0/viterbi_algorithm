import { useLayoutContext } from "../../../Layout/components/LayoutProvider";
import { ControlPanelWrapper } from "../ControlPanelWrapper";
import { ForwardButton } from "../Button";
import { useGetNextStep } from "../../../../api/hooks/useGetNextStep";

export function ControlPanel(): JSX.Element {
  const { defineMessage } =
    useLayoutContext();

  const fetchNextStep = useGetNextStep();

  const nextStepHandler = async () => {
    const fetchedMessage = await fetchNextStep();

    defineMessage(fetchedMessage.toString());
  };

  return (
    <ControlPanelWrapper>
      <ForwardButton
        onClick={nextStepHandler}
      />
    </ControlPanelWrapper>
  );
}
