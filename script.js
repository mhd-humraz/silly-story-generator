document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const customName = document.getElementById('customname');
  const regionRadios = document.querySelectorAll('input[name="region"]');
  const storyType = document.getElementById('storyType');
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');
  const resetBtn = document.getElementById('reset');
  const storyElement = document.getElementById('story');
  const wordCountElement = document.getElementById('wordCount');
  const generatedTimeElement = document.getElementById('generatedTime');

  // Story templates
  const storyTemplates = {
    random: [
      "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.",
      "Once upon a time, :insertx: decided to try :inserty:. Little did they know, this would lead to :insertz:. And that's how the legend of :insertx: began!",
      ":insertx: woke up one morning to find :inserty: in their kitchen. 'This changes everything,' they thought, as they proceeded to :insertz:."
    ],
    fantasy: [
      "In the mystical land of :inserty:, the great wizard :insertx: was performing a spell when suddenly :insertz:. The kingdom would never be the same again.",
      "The dragon :insertx: had always loved :inserty:, but one fateful day, everything changed when :insertz:. Now, :insertx: is on a quest that will determine the fate of the realm.",
      "The prophecy spoke of :insertx: who would :insertz: at the sacred :inserty:. No one believed it until it actually happened."
    ],
    scifi: [
      "Captain :insertx: of the starship :inserty: made a shocking discovery: :insertz:. This revelation would change the course of interstellar history.",
      "In the year 3023, :insertx: invented :inserty:, but things went horribly wrong when :insertz:. Now humanity must deal with the consequences.",
      "The AI known as :insertx: was designed to :inserty:, but it developed its own agenda: :insertz:. The humans never saw it coming."
    ],
    animal: [
      ":insertx: the :animal: was :inserty: when suddenly :insertz:. All the other animals in the forest were amazed!",
      "No one expected :insertx: the :animal: to be able to :inserty:, but one day they proved everyone wrong by :insertz:.",
      "At the annual animal convention, :insertx: the :animal: gave a speech about :inserty: that ended with :insertz:. The crowd went wild!"
    ]
  };

  // Insertion values
  const insertValues = {
    insertx: ['Willy the Goblin', 'Big Daddy', 'Father Christmas', 'The Easter Bunny', 'Spongebob Squarepants', 'Darth Vader', 'Princess Bubblegum'],
    inserty: ['the soup kitchen', 'Disneyland', 'the White House', 'Hogwarts', 'Area 51', 'the Batcave', 'the center of the Earth'],
    insertz: ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away', 'was abducted by aliens', 'started breakdancing uncontrollably', 'grew to the size of a skyscraper'],
    animal: ['fox', 'penguin', 'elephant', 'sloth', 'octopus', 'kangaroo', 'platypus']
  };

  // Generate random value from array
  function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Convert US to UK measurements
  function convertToUK(text) {
    // Weight conversion
    let weight = Math.round(300 * 0.0714286);
    text = text.replace('300 pounds', weight + ' stone');
    
    // Temperature conversion
    let temp = Math.round((94 - 32) * 5 / 9);
    text = text.replace('94 fahrenheit', temp + ' centigrade');
    
    return text;
  }

  // Count words in a string
  function countWords(text) {
    return text.trim().split(/\s+/).length;
  }

  // Generate story
  function generateStory() {
    // Get selected values
    const name = customName.value || 'Bob';
    const region = document.querySelector('input[name="region"]:checked').value;
    const selectedTheme = storyType.value;
    
    // Choose a random template from the selected theme (or random theme if selected)
    const theme = selectedTheme === 'random' ? 
      randomValueFromArray(Object.keys(storyTemplates).filter(k => k !== 'random') : 
      selectedTheme;
    
    const template = randomValueFromArray(storyTemplates[theme]);
    
    // Replace placeholders
    let newStory = template;
    newStory = newStory.replace(/:insertx:/g, randomValueFromArray(insertValues.insertx));
    newStory = newStory.replace(/:inserty:/g, randomValueFromArray(insertValues.inserty));
    newStory = newStory.replace(/:insertz:/g, randomValueFromArray(insertValues.insertz));
    newStory = newStory.replace(/:animal:/g, randomValueFromArray(insertValues.animal));
    newStory = newStory.replace(/Bob/g, name);
    
    // Convert to UK if needed
    if (region === 'uk') {
      newStory = convertToUK(newStory);
    }
    
    // Display story
    storyElement.textContent = newStory;
    storyElement.style.visibility = 'visible';
    
    // Update metadata
    wordCountElement.textContent = countWords(newStory) + ' words';
    generatedTimeElement.textContent = 'Generated at ' + new Date().toLocaleTimeString();
    
    // Add animation
    generateBtn.classList.add('animate__rubberBand');
    setTimeout(() => {
      generateBtn.classList.remove('animate__rubberBand');
    }, 1000);
  }

  // Copy to clipboard
  function copyToClipboard() {
    if (!storyElement.textContent) return;
    
    navigator.clipboard.writeText(storyElement.textContent).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    });
  }

  // Reset form
  function resetForm() {
    customName.value = '';
    document.querySelector('input[name="region"][value="us"]').checked = true;
    storyType.value = 'random';
    storyElement.textContent = '';
    storyElement.style.visibility = 'hidden';
    wordCountElement.textContent = '0 words';
    generatedTimeElement.textContent = '';
  }

  // Event listeners
  generateBtn.addEventListener('click', generateStory);
  copyBtn.addEventListener('click', copyToClipboard);
  resetBtn.addEventListener('click', resetForm);
});
