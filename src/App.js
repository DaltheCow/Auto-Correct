import React from 'react';
var dictionary = require('./words.json')

const getBigram = word => {
  let result = [];
  for (let i = 0; i < word.length - 1; i++) {
    result.push(word.slice(i, i + 2));
  }
  return result;
}


/* 

{ numOfOccurences: 2, string: 'df' }
{ 'df': 2, 'as': 1 }


*/

const createBigramCountObj = bigram => {
  const countHash = {};
  bigram.forEach(string => {
    if (countHash[string] !== undefined) {
      countHash[string]++;
    } else {
      countHash[string] = 1;
    }
  });
  return countHash;
}


const getSimilarityRatio = (bigramDictionaryWord, bigramTypedWord, wordBRHash, dictBRHash) => {
  let count = 0;
  Object.keys(dictBRHash).forEach(key => {
    if (wordBRHash[key]) {
      count += Math.min(dictBRHash[key], wordBRHash[key]);
    }
  });
  // for (let i = 0; i < bigramDictionaryWord.length; i++) {

  //   if (bigramTypedWord.includes(bigramDictionaryWord[i])) {
  //     count++;
  //   }
  // }
  const res = count / Math.max(bigramDictionaryWord.length, bigramTypedWord.length);
  return res;
}

const getAutocorrectedWord = word => {
  let currentMax = null;
  const wordBigram = getBigram(word);
  const wordBRHash = createBigramCountObj(wordBigram);
  dictionaryData.forEach(data => {
    const similarity = getSimilarityRatio(data.bigram, wordBigram, wordBRHash, data.countHash);
    if (!currentMax || currentMax.similarity < similarity) {
      currentMax = { similarity, word: data.word };
    }
  });
  return currentMax.word;
}
const before = Date.now();
console.log(before);
const dictionaryData = dictionary.words.map(word => {
  const bigram = getBigram(word);
  return { bigram, word, countHash: createBigramCountObj(bigram) };
}).filter(bigramObj => bigramObj.word.length > 1);
console.log(Date.now() - before);
function App() {
  const [text, setText] = React.useState('');

  const handleOnChange = e => {
    const text = e.target.value;
    if (text.length > 1) {
      const alphabet = `"',.?:;! -`;
      console.log(text);
      console.log(getAutocorrectedWord(text));
      if (alphabet.includes(text[text.length - 1])) {
        //autocorrect the last word in text
        // get last word in text
        // get autocorrect of that word
        // replace the word in the text with the autocorrect version
        // set the new text string
      }
    }
    setText(e.target.value);

  }

  return (
    <div>
      <input onChange={e => handleOnChange(e)} value={text} />
    </div>
  );
}

export default App;
