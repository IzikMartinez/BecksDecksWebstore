function checkAndSplit(str: string): string {
    if (str.includes('-')) {
        let parts = str.split('-');
        return parts[1];
    }
    return str;
}

export default checkAndSplit