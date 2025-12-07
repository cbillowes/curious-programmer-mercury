'use client';

import { useReportWebVitals } from 'next/web-vitals';

const trackMetricToGA = ({
  name,
  value,
  id,
}: {
  name: string;
  value: number;
  id: string;
}) => {
  // Check if the gtag function is available (assuming you've loaded the GA script)
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, {
      // Event parameters
      value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS is rounded to 1/1000th
      metric_id: id, // Unique ID for the metric instance
      metric_value: value,
      metric_name: name,
      // Optional: Add other contextual info like path
      path: window.location.pathname,
    });
  }
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (['FCP', 'LCP', 'CLS', 'FID', 'INP', 'TTFB'].includes(metric.name)) {
      trackMetricToGA(metric);
    }
  });

  return null; // This component doesn't render any UI
}
