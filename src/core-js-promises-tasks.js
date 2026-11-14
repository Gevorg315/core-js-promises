/**
 * Returns a Promise that is fulfilled with the input number if non-negative,
 * and rejected if negative.
 *
 * @param {number} number
 * @return {Promise<number>}
 */
function getPromise(number) {
  return new Promise((resolve, reject) => {
    if (number >= 0) {
      resolve(number);
    } else {
      reject(number);
    }
  });
}

/**
 * Returns a promise that is always fulfilled with 'success' or 'fail'.
 *
 * @param {Promise} source
 * @return {Promise<string>}
 */
function getPromiseResult(source) {
  return source.then(
    () => 'success',
    () => 'fail'
  );
}

/**
 * Returns a promise fulfilled with the first successfully resolved value.
 * If all promises are rejected, the returned promise is rejected.
 *
 * @param {Array<Promise<number>>} promises
 * @return {Promise<number>}
 */
function getFirstResolvedPromiseResult(promises) {
  return Promise.any(promises);
}

/**
 * Returns the result of the first promise that settles,
 * whether fulfilled or rejected.
 *
 * @param {Array<Promise<number>>} promises
 * @return {Promise<number>}
 */
function getFirstPromiseResult(promises) {
  return Promise.race(promises);
}

/**
 * Resolves with an array of all values if every promise succeeds.
 * Rejects if at least one promise fails.
 *
 * @param {Array<Promise<number>>} promises
 * @return {Promise<Array<number>>}
 */
function getAllOrNothing(promises) {
  return Promise.all(promises);
}

/**
 * Returns an array of results.
 * Rejected promises are represented by null.
 *
 * @param {Array<Promise<number>>} promises
 * @return {Promise<Array<number|null>>}
 */
function getAllResult(promises) {
  return Promise.allSettled(promises).then((results) =>
    results.map((result) =>
      result.status === 'fulfilled' ? result.value : null
    )
  );
}

/**
 * Processes promises sequentially and concatenates their resolved values.
 * Static Promise methods must not be used.
 *
 * @param {Array<Promise<number>>} promises
 * @return {Promise<string>}
 */
function queuePromises(promises) {
  return promises.reduce(
    (resultPromise, currentPromise) =>
      resultPromise.then((result) =>
        currentPromise.then((value) => result + value)
      ),
    Promise.resolve('')
  );
}

module.exports = {
  getPromise,
  getPromiseResult,
  getFirstResolvedPromiseResult,
  getFirstPromiseResult,
  getAllOrNothing,
  getAllResult,
  queuePromises,
};
