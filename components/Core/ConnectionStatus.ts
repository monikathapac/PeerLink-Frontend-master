export const getFiriendStatus = (view: number) => {
    switch (view) {
        case 1:
            return ("Friend")
        case 2:
            return ("Friend of Friend")
        case 3:
            return ("Stranger")
        default:
            break;
    }
}