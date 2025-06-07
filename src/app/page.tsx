import { Suspense } from 'react';
import CatalogPage from './CatalogPage';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogPage />
    </Suspense>
  );
}
