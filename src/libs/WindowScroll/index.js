/**
 * Add a window document scroll listener if available. Return a function to remove the listener.
 *
 * @param {Function} onWindowScroll
 * @returns {Function}
 */
function addWindowScrollListener(onWindowScroll) {
    window.addEventListener('scroll', onWindowScroll);
    return () => window.removeEventListener('scroll', onWindowScroll);
}

export default addWindowScrollListener;
