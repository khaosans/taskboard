// Example of checking for undefined
if (object && object.get) {
  // Safe to access object.get
} else {
  console.error('Object is undefined or does not have a get method');
}
