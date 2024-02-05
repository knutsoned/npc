var Story = require('inkjs').Story
var fs = require('fs')
var readline = require('readline')

//load the ink file
var inkFile = fs
  .readFileSync('../docs/ink/map.ink.json', 'UTF-8')
  .replace(/^\uFEFF/, '')

//create a new story
var myStory = new Story(inkFile)

// console.dir(myStory)

//start reading and writting to the console
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

continueToNextChoice()

function continueToNextChoice() {
  //check we haven't reached the end of the story
  if (!myStory.canContinue && myStory.currentChoices.length === 0) end()

  //write the story to the console until we find a choice
  while (myStory.canContinue) {
    console.log(myStory.Continue())
  }

  // console.dir(myStory, {depth: 4, colors: true})
  
  //check if there are choices
  if (myStory.currentChoices.length > 0) {
    for (var i = 0; i < myStory.currentChoices.length; ++i) {
      var choice = myStory.currentChoices[i]
      console.log(i + 1 + '. ' + choice.text)
    }

    //prompt the user for a choice
    rl.question('> ', (answer) => {
      //continue with that choice
      myStory.ChooseChoiceIndex(parseInt(answer) - 1)
      continueToNextChoice()
    })
  } else {
    //if there are no choices, we reached the end of the story
    end()
  }
}

function end() {
  console.log('THE END')
  rl.close()
}
