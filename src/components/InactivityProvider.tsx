import React, { useRef, useEffect } from 'react';
import { View, PanResponder, AppState } from 'react-native';

const INACTIVITY_TIME = 1 * 60 * 1000; // 5 minutes

export const InactivityProvider = ({
  children,
  onInactive,
  onActive,
}: {
  children: React.ReactNode;
  onInactive: () => void;
  onActive?: () => void;
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);
  const isInactive = useRef(false);

  const onInactiveRef = useRef(onInactive);
  const onActiveRef = useRef(onActive);

  useEffect(() => {
    onInactiveRef.current = onInactive;
    onActiveRef.current = onActive;
  }, [onInactive, onActive]);

  const handleUserActivity = () => {
    if (isInactive.current) {
      isInactive.current = false;
      onActiveRef.current?.();
    }

    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      isInactive.current = true;
      onInactiveRef.current();
    }, INACTIVITY_TIME);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'background') {
        if (timerRef.current) clearTimeout(timerRef.current);
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        handleUserActivity();
      }

      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        handleUserActivity();
        return false;
      },
      onMoveShouldSetPanResponderCapture: () => {
        handleUserActivity();
        return false;
      },
    }),
  ).current;

  return (
    <View
      style={{ flex: 1 }}
      {...panResponder.panHandlers}
      onTouchStart={handleUserActivity}
    >
      {children}
    </View>
  );
};
