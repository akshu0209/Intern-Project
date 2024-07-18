function searchContent() {
    // Get the input field and its value
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();

    // Get all the content within the 'content' div
    const content = document.querySelector('.content');

    // Remove previous highlights
    const highlightedElements = content.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        element.classList.remove('highlight');
    });

    if (filter.trim() === "") {
        return;
    }

    // Create a regex for the search term
    const regex = new RegExp(filter, 'gi');

    // Walk through the nodes in the content div and highlight matches
    walkNodes(content, regex);
}

function walkNodes(node, regex) {
    // Walk through the DOM nodes
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;

    while (currentNode = walker.nextNode()) {
        // If there's a match, wrap the text in a span with the 'highlight' class
        const text = currentNode.nodeValue;
        const match = text.match(regex);

        if (match) {
            const span = document.createElement('span');
            span.className = 'highlight';
            span.innerHTML = text.replace(regex, '<mark>$&</mark>');
            currentNode.parentNode.replaceChild(span, currentNode);
        }
    }
}

const btn=document.getElementById(submit);
btn.addEventListener("click",searchContent());
