import {Controls} from './components/Controls';
import {TimePanel} from './components/TimePanel';
import {VStack} from '@chakra-ui/react';

export const App = () => {
  return (
    <VStack mt={16} spacing="24px">
      <TimePanel />
      <Controls />
    </VStack>
  );
};
