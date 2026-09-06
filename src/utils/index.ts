import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
  const dateToFormat = new Date(date);
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle, timeZone: 'UTC' });
  return dateFormatter.format(dateToFormat);
}
