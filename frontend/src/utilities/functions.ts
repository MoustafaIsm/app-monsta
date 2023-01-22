
export const convertStringToArray = (data: string) => {
    const temp = data.split(/\r?\n/);
    const result: string[] = [];
    temp.forEach((item: string) => {
        if (item !== '')
            result.push(JSON.parse(item));
    });
    return result;
}