export const DateFormatter = (value: string): string => {
  const dateString = new Date(value).toDateString();
  return dateString.replace(/^\S+\s/,'');
}
