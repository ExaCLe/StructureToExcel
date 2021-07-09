// compares two arrays for equality
const compareArrays = (first, snd) => {
  if (!first && !snd) return true;
  if (!first) return false;
  if (!snd) return false;
  // check for same length
  if (first.length != snd.length) return false;
  // iterate over the array and compare the objects
  for (let i = 0; i < first.length; i++) {
    if (typeof first[i] === "object") {
      if (!this.compareObjects(first[i], snd[i])) return false;
    } else if (!(first[i] === snd[i])) {
      return false;
    }
  }

  // if reached here arrays are equal
  return true;
};

// compares two objects for equality
const compareObjects = (first, snd) => {
  if (!first && !snd) return true;
  if (!first) return false;
  if (!snd) return false;
  // get the keys out of the objects
  const keys = Object.keys(first);
  // make sure the keys are equal
  if (!this.compareArrays(keys, Object.keys(snd))) return false;

  // iterate over the keys
  for (let i = 0; i < keys.length; i++) {
    if (typeof first[keys[i]] === "object") {
      if (!this.compareArrays(first[keys[i]], snd[keys[i]])) return false;
    } else if (!(first[keys[i]] === snd[keys[i]])) return false;
  }

  return true;
};

compareHabits = (first, snd) => {
  if (!first && !snd) return true;
  if (!first) return false;
  if (!snd) return false;
  if (first.length != snd.length) return false;
  // compare the names
  for (let i = 0; i < first.length; i++) {
    if (!(first[i].name === snd[i].name)) return false;
  }
  return true;
};
