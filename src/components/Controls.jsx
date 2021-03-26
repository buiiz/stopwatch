import {Button, HStack} from '@chakra-ui/react';
import {useState} from 'react';

export const Controls = () => {
  const [val, setVal] = useState(false);
  return (
    <HStack direction={['column', 'row']} spacing="16px">
      <Button
        colorScheme={val ? 'green' : 'red'}
        onClick={() => setVal((state) => !state)}
        width={70}
      >
        {val ? 'Start' : 'Stop'}
      </Button>
      <Button colorScheme="yellow" variant="outline" isDisabled={val}>
        Wait
      </Button>
      <Button colorScheme="red" variant="outline" isDisabled={val}>
        Reset
      </Button>
    </HStack>
  );
};
