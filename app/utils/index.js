//
export const sliceText = (text = '', numberOfLetters = 36) => {
    if (text.length > numberOfLetters)
        return text.slice(0, numberOfLetters) + '...'
    return text;
}
//