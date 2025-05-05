export function getPaper() {
    let paperDiv = document.querySelector('#paper_id');
    if (paperDiv == null) {
        return undefined;
    }
    return paperDiv['view'].mobject;
}
export function getSidebar() {
    let sidebarDiv = document.querySelector('#sidebar_id');
    if (sidebarDiv == null) {
        return undefined;
    }
    return sidebarDiv['view'].mobject;
}
//# sourceMappingURL=getters.js.map