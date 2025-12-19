'use client';

import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'cp:tutorial:v1:dismissed';

function dismissed() {
  return (
    typeof window !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY) === 'true'
  );
}

function dismiss() {
  localStorage.setItem(STORAGE_KEY, 'true');
}

// Polls using rAF (fast, cheap) until predicate is true or timeout
function waitFor(predicate: () => boolean, timeoutMs = 8000) {
  return new Promise<boolean>((resolve) => {
    const start = performance.now();

    const tick = () => {
      if (predicate()) return resolve(true);
      if (performance.now() - start > timeoutMs) return resolve(false);
      requestAnimationFrame(tick);
    };

    tick();
  });
}

function isLoadingBeaconGone() {
  return !document.querySelector('[data-beacon="loading"]');
}

export function Tour() {
  const [run, setRun] = useState(false);
  const startedRef = useRef(false);

  const steps: Step[] = useMemo(
    () => [
      {
        target: '[data-tour="page-scroll"]',
        content: 'Drag to scroll through the page.',
        disableBeacon: true,
      },
      {
        target: '[data-tour="nav"]',
        content:
          'Use the navigation menu to explore different sections of the site.',
        disableBeacon: true,
      },
      {
        target: '[data-tour="search"]',
        content: 'Use search to find things quickly.',
        disableBeacon: true,
      },
      {
        target: '[data-tour="theme-toggle"]',
        content: 'Toggle between light and dark mode here.',
        disableBeacon: true,
      },
      {
        target: '[data-tour="account"]',
        content:
          'Access exclusive content and features by signing in to your account.',
        disableBeacon: true,
      },
    ],
    [],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (dismissed()) return;
      if (startedRef.current) return;

      // Wait for loading beacon to disappear
      const loadingGone = await waitFor(isLoadingBeaconGone, 15000);
      if (cancelled || !loadingGone) return;

      startedRef.current = true;
      setRun(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [steps]);

  const onCallback = (data: CallBackProps) => {
    const finished =
      data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED;

    if (finished) {
      dismiss();
      setRun(false);
    }
  };

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={onCallback}
      continuous
      scrollToFirstStep
      showSkipButton
      disableScrolling={false}
      styles={{
        options: {
          arrowColor: '#DE3163',
          backgroundColor: '#DE3163',
          overlayColor: 'rgba(79, 26, 0, 0.4)',
          primaryColor: '#000000',
          textColor: '#ffffff',
          zIndex: 1000,
        },
      }}
    />
  );
}

export function triggerTour() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
