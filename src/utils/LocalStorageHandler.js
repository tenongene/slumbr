
export function setLocalStorageItems(items) {
  if (typeof items !== 'object' || items === null) {
    console.error('Input must be an object.');
    return;
  }

  for (const key in items) {
    if (Object.hasOwnProperty.call(items, key)) {
      try {
        const value = JSON.stringify(items[key]); // Stringify to handle objects, arrays, etc.
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting localStorage item for key "${key}":`, error);
      }
    }
  }
}

//retrieving the data.
export function getLocalStorageItems(keys) {
  if (!Array.isArray(keys)) {
    console.error('Input must be an array of keys.');
    return null;
  }

  const retrievedItems = {};

  keys.forEach(key => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        retrievedItems[key] = JSON.parse(storedValue); // Parse back to original type
      } else {
        retrievedItems[key] = null; // or undefined, your choice.
      }
    } catch (error) {
      console.error(`Error getting localStorage item for key "${key}":`, error);
      retrievedItems[key] = null; // or undefined, your choice.
    }
  });

  return retrievedItems;
}



