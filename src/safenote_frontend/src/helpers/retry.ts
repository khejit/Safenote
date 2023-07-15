export const retry = function(numOfRetries){
    return async (
        fn, callback, retries = numOfRetries
    ) => {
        try {
            const returnVal = await fn();
            callback();
            return returnVal;
        } catch (err) {
            if (retries <= 0) {
                return Promise.reject();
            }
            return retry(fn, callback, (retries - 1));
        }
    }
}