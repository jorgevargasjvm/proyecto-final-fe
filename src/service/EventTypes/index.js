
export function getId(event) {
    let value = event?._links?.self?.href;
    return value.substr(value.length - 1)
}