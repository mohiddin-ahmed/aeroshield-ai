import { useEffect, useRef } from 'react';

/**
 * Shared WCAG 2.1 AA modal accessibility hook enabling Escape-key dismissal
 * and restoring focus to the triggering element when the dialog closes.
 * @param isOpen - Whether the dialog is currently open.
 * @param onClose - Callback invoked to close the modal.
 */
export function useModalAccessibility(isOpen: boolean, onClose: () => void): void {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return undefined;

    if (document.activeElement instanceof HTMLElement) {
      previouslyFocusedRef.current = document.activeElement;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function' && prev.isConnected) {
        prev.focus();
      }
    };
  }, [isOpen, onClose]);
}
