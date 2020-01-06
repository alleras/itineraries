// TODO: ALlow key to be a method or a string
const groupBy = (array, key, keyMethod = false) => {
    return array.reduceRight((accum, curr) => {
        let keyClassifier = keyMethod ? keyMethod(curr) : curr[key]
        return {...accum, [keyClassifier]:curr}
    }, {})
}