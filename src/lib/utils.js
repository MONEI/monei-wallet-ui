import {formatNumber} from 'libphonenumber-js';

export const formatIfPhone = text =>
  text.startsWith('+') ? formatNumber(text, 'International') : text;
