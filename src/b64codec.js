/**
 * Decode a uint8 array from a base64 encoded string
 * @param {string} text
 * @returns {Uint8Array}
 */
export function decodeB64(text) {
  // XXX: TODO do we need to ensure the slice method via addSlice ?
  return new Uint8Array(Buffer.from(text, "base64"));
}

/**
 * Encode a uint8 array as a base64 string
 * @param {Uint8Array} array
 * @returns {string}
 */
export function encodeB64(array) {
  return Buffer.from(array).toString("base64");
}

/**
 * Encode a hex string to binary, and thence to base64
 * @param {string} hex
 * @returns {string} the base64 encoding of the binary represented by the hex string
 */
export function encodeB64FromHex(hex) {
  return encodeB64(arrayFromHex(hex));
}

export function arrayFromHex(hex) {
  if (typeof hex !== "string")
    throw new Error(`hex must be string not ${typeof hex}`);
  if (hex.length % 2) throw new Error(`hex string must be even length`);
  if (hex.substring(0, 2) === "0x") hex = hex.substring(2);
  const arr = [];
  for (let i = 0; i < hex.length; i += 2)
    arr.push(parseInt(hex.substring(i, i + 2), 16));
  return new Uint8Array(arr);
}

function addSlice(array) {
  if (array.slice) {
    return array;
  }
  array.slice = function () {
    var args = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };
  return array;
}
