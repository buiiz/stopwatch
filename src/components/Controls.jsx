import {Button, HStack, Tooltip} from '@chakra-ui/react';
import {useContext, useEffect, useRef} from 'react';
import {StopwatchContext} from '../state/StopwatchContext';
import {BehaviorSubject, fromEvent, interval, NEVER} from 'rxjs';
import {switchMap, filter, buffer, debounceTime} from 'rxjs/operators';

const playing$ = new BehaviorSubject(false);
const observable$ = playing$.pipe(
  switchMap((playing) => (playing ? interval(1000) : NEVER))
);

export const Controls = () => {
  const startStopRef = useRef(null);
  const waitRef = useRef(null);
  const resetRef = useRef(null);
  const {isEnabled, setIsEnabled, setSeconds} = useContext(StopwatchContext);

  useEffect(() => {
    const stopwatchSubscription$ = observable$.subscribe(() => {
      setSeconds((seconds) => seconds + 1);
    });

    const startStopClick$ = fromEvent(startStopRef.current, 'click');
    const resetClick$ = fromEvent(resetRef.current, 'click');
    const waitClick$ = fromEvent(waitRef.current, 'click');
    const waitDoubleClick$ = waitClick$.pipe(
      buffer(waitClick$.pipe(debounceTime(300))),
      filter((clicks) => clicks.length === 2)
    );

    const startStopSubscription$ = startStopClick$.subscribe(handleStartStop);
    const resetSubscription$ = resetClick$.subscribe(handleReset);
    const waitStopSubscription$ = waitDoubleClick$.subscribe(handleWait);

    return () => {
      stopwatchSubscription$.unsubscribe();
      startStopSubscription$.unsubscribe();
      resetSubscription$.unsubscribe();
      waitStopSubscription$.unsubscribe();
    };
  }, [isEnabled]);

  const handleStartStop = () => {
    if (isEnabled) {
      setIsEnabled(false);
      setSeconds(0);
      playing$.next(false);
    } else {
      setIsEnabled(true);
      playing$.next(true);
    }
  };

  const handleWait = () => {
    setIsEnabled(false);
    playing$.next(false);
  };

  const handleReset = () => {
    setSeconds(0);
    playing$.next(false);
    playing$.next(true);
  };

  return (
    <HStack direction={['column', 'row']} spacing="16px">
      <Button
        colorScheme={isEnabled ? 'red' : 'green'}
        variant="solid"
        width={70}
        ref={startStopRef}
      >
        {isEnabled ? 'Stop' : 'Start'}
      </Button>

      <Tooltip
        label="Double click (less than 300ms between clicks)"
        openDelay={1000}
      >
        <Button
          colorScheme="yellow"
          variant="outline"
          isDisabled={!isEnabled}
          ref={waitRef}
        >
          Wait
        </Button>
      </Tooltip>

      <Button
        colorScheme="blue"
        variant="solid"
        isDisabled={!isEnabled}
        ref={resetRef}
      >
        Reset
      </Button>
    </HStack>
  );
};
