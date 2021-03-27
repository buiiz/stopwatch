import {Box, Text} from '@chakra-ui/react';
import {useContext} from 'react';
import {StopwatchContext} from '../state/StopwatchContext';
import {timeFormat} from '../utils/timeFormat';

export const TimePanel = () => {
  const {seconds} = useContext(StopwatchContext);
  const time = timeFormat(seconds);
  return (
    <Box color="yellow.500" p={2} maxW={250} className="time-panel">
      <Text fontSize="6xl">{time}</Text>
    </Box>
  );
};
