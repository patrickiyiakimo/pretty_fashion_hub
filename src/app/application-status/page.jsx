'use client';

import { Suspense } from 'react';
import Loading from './loading';
import ApplicationStatusContent from './ApplicationStatusContent';

export default function ApplicationStatusPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ApplicationStatusContent />
    </Suspense>
  );
}