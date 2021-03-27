import {Button, HStack} from '@chakra-ui/react';
import {useContext} from 'react';
import {StopwatchContext} from '../state/StopwatchContext';

export const Controls = () => {
  const {isEnabled, setIsEnabled} = useContext(StopwatchContext);

  const handleStartStop = () => {
    setIsEnabled((state) => !state);
  };
  const handleWait = () => {};
  const handleReset = () => {};

  return (
    <HStack direction={['column', 'row']} spacing="16px">
      <Button
        colorScheme={isEnabled ? 'red' : 'green'}
        variant="solid"
        width={70}
        onClick={handleStartStop}
      >
        {isEnabled ? 'Stop' : 'Start'}
      </Button>

      <Button
        colorScheme="yellow"
        variant="outline"
        isDisabled={!isEnabled}
        onClick={handleWait}
      >
        Wait
      </Button>

      <Button
        colorScheme="blue"
        variant="solid"
        isDisabled={!isEnabled}
        onClick={handleReset}
      >
        Reset
      </Button>
    </HStack>
  );
};
