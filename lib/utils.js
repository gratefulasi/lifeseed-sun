export function title() {
    console.log(window.location.pathname)
    const pathName = window.location.pathname;
    if (pathName.includes("present")) {
        return "the market";
    } else if (pathName.includes("post")) {
        return "";
    } else {
        return "";
    }
}