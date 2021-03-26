import {Box, Text} from '@chakra-ui/react';

export const TimePanel = () => {
  return (
    <Box color="yellow.500" p={2} maxW={250} className="time-panel">
      <Text fontSize="6xl">00:00:00</Text>
    </Box>
  );
};
