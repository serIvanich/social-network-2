
export const required = (value: string | undefined) => {
    console.log(value)
    if (value) return undefined
    return 'File is required!!!'
}

export const maxLengthCreator = (maxLength: number) => (value: string | undefined) => {
    if (value && value.length > maxLength) return 'Error in max length message!!!'
    return undefined
}
