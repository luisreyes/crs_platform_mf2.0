import React, { createContext, useMemo } from 'react';

const AppMonitorContext = createContext(null);
const { Provider } = AppMonitorContext;

let isAppMonitorInitialized = false;
let SeverityLevel = {
  Verbose: 0,
  Information: 1,
  Warning: 2,
  Error: 3,
  Critical: 4,
};

const debug = true;

const log = (...args) =>
  debug &&
  console.log(
    '%cAppMonitor %c|',
    'color: dodgerblue',
    'color: dimgrey',
    ...args,
  );

const initializeAppMonitor = (connectionString) => {
  if (isAppMonitorInitialized) return;
  log('[AppMonitor Initialized]', connectionString);

  // Monitoring Init Here

  isAppMonitorInitialized = true;
};

const AppMonitorProvider = ({ children, connectionString }) => {
  initializeAppMonitor(connectionString);

  /**
   * Event Tracking
   * @param {string} name - Event name
   */
  const trackEvent = (name = 'Some Event') => {
    log('[Track Event]', name);
  };
  /**
   * Page load Track
   * @param {string} name - Page title
   */
  const trackPageView = (name = 'Page Title') => {
    log('[Track Page View]', name);
  };
  /**
   * Exception Tracking
   * @param {error} exception - Exception to be tracked
   */
  const trackException = (exception = new Error('Some Exception')) => {
    log('[Track Exception]', exception);
  };
  /**
   * Message Trace
   * @param {string} message - Message to track
   * @param {enum} severityLevel - Severity level enumerator
   */
  const trackTrace = (
    message = 'Some Trace',
    severityLevel = SeverityLevel.Information,
  ) => {
    log('[Track Trace]', { message: message, severityLevel: severityLevel });
  };

  /**
   * Event Start Tracking
   * @param {string} event - Description of the event
   */
  const trackEventStart = (event = 'Some Event Started') => {
    log('[Track Event Start]', event);
  };

  /**
   * Event Stop Tracking
   * @param {string} event - Description of the event
   * @param {any} data - Additional parameters to track
   */
  const trackEventStop = (event = 'Some Event Stopped', data = {}) => {
    log('[Track Event Stop]', event);
  };

  const values = useMemo(
    () => ({
      appMonitor: {
        trackEvent,
        trackPageView,
        trackException,
        trackTrace,
        trackEventStart,
        trackEventStop,
      },
    }),
    [],
  );

  return <Provider value={values}>{children}</Provider>;
};

export { AppMonitorProvider, AppMonitorContext };
