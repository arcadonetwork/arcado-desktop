import React, { Suspense } from 'react';
import { Loading } from '../../components/fallbacks/Loading'

export const LazyLoad = (Component: any) => (props: any) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
)
