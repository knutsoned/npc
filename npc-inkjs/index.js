import fs from 'fs'
import Inkjs from 'inkjs' // import * as Inkjs.. does not work
import * as readline from 'readline'

const data = fs.readFileSync('../docs/ink/map.ink', 'UTF-8')

const myStory = new Inkjs.Compiler(data).Compile()
// console.dir(myStory)

//start reading and writting to the console
const rl = readline.createInterface({
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
    for (let i = 0; i < myStory.currentChoices.length; ++i) {
      const choice = myStory.currentChoices[i]
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
