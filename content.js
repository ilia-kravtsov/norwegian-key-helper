const mappings = {
    o: ["ø", "Ø"],
    a: ["å", "Å"],
    e: ["æ", "Æ"]
};

document.addEventListener("keydown", (event) => {
    if (!event.altKey || event.ctrlKey || event.metaKey) {
        return;
    }

    const key = event.key.toLowerCase();

    if (!(key in mappings)) {
        return;
    }

    const target = event.target;

    const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

    if (!isEditable) {
        return;
    }

    event.preventDefault();

    const char = event.shiftKey
        ? mappings[key][1]
        : mappings[key][0];

    insertText(target, char);
});

function insertText(element, text) {
    if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
    ) {
        const start = element.selectionStart ?? 0;
        const end = element.selectionEnd ?? 0;

        element.setRangeText(text, start, end, "end");

        element.dispatchEvent(
            new InputEvent("input", {
                bubbles: true,
                cancelable: true
            })
        );

        return;
    }

    if (element.isContentEditable) {
        document.execCommand("insertText", false, text);
    }
}