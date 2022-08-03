function dateFormatter(date: string): string {
    return new Date(date).toLocaleDateString();
}

export default dateFormatter;