import { useEffect } from 'react';

/**
 * Shared WCAG 2.1 AA modal accessibility hook enabling Escape-key dismissal
 * and restoring keyboard usability across all dialog overlays.
 * @param {boolean} isOpen - Whether the dialog is currently open.
 * @param {() => void} onClose - Callback invoked to close the modal.
 */
export function useModalAccessibility(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
