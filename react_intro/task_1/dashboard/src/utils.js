export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getFooterCopy(isIndex) {
  if (isIndex) {
    return 'holberton School';
  }
  return 'Holberton School main dashboard';
}
