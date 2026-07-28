import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes while handling conflicts properly.
 * Combines clsx for conditional classes and tailwind-merge to resolve conflicts.
 *
 * @example
 * cn('px-2 py-1', condition && 'px-4')
 * // Result: 'py-1 px-4' (px-4 overrides px-2)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
