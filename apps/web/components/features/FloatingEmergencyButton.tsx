'use client';

import { EmergencyButton } from '@/components/ui/EmergencyButton';

export function FloatingEmergencyButton() {
  const handleEmergencyClick = () => {
    window.location.href = 'tel:999';
  };

  return (
    <div className="hidden md:block fixed bottom-6 end-6 z-50">
      <EmergencyButton onClick={handleEmergencyClick} />
    </div>
  );
}
