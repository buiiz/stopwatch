import {Controls} from './components/Controls';
import {TimePanel} from './components/TimePanel';
import {VStack} from '@chakra-ui/react';
import {useMemo, useState} from 'react';
import {StopwatchContext} from './state/StopwatchContext';

export const App = () => {
  const [seconds, setSeconds] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  const value = useMemo(
    () => ({seconds, setSeconds, isEnabled, setIsEnabled}),
    [seconds, isEnabled]
  );

  return (
    <StopwatchContext.Provider value={value}>
      <VStack mt={16} spacing="24px">
        <TimePanel />
        <Controls />
      </VStack>
    </StopwatchContext.Provider>
  );
};
