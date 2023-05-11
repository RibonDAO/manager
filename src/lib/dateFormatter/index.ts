function dateFormatter(date: string | undefined): string {
  if(!date) return "";

  return new Date(date).toLocaleDateString();
}

export default dateFormatter;
