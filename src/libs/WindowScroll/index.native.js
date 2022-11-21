
/**
 * Window document scroll listener is not available on native, so return an empty function.
 *
 * @returns {Function}
 */
function addWindowScrollListener() {
    return () => {};
}

export default addWindowScrollListener;
