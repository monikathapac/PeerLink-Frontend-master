export function getValidation(field: string) {
    switch (field.toLocaleLowerCase()) {
        case "email":
            return { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }
        case "expiry date":
            return { pattern: /\b(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})\b/ }
        case "cvv":
            return { pattern: /^(?!(.)\1{3})(?!19|20)\d{4}$/ }
        default:
            return { required: true }
    }
}