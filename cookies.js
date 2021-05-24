let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class Queue {
  constructor(head = null) {
    this.head = head
    this.tail = head
  }

  push(value) { // add new element to the end of the list
    this.tail.next = new Node(value)
    this.tail = this.tail.next
  }

  pop() {
    if (this.head.next != null) {
      this.head = this.head.next
    } else {
      this.head = null
    }
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value
    this.next = next
  }
}

let lineIndex = 0

let numberOfKids = 0
let kidsPreferences = []
let kidsPreferencesQueue
let numberOfCookies = 0
let cookieSizes = []
let cookieSizesQueue

let happyKidsCounter = 0

rl.on('line', function (line) {

  if (lineIndex == 0) {

    numberOfKids = parseInt(line)

  } else if (lineIndex == 1) {

    kidsPreferences = line.split(' ').map(el => parseInt(el)).sort(function (a, b) { return a - b })

  } else if (lineIndex == 2) {

    numberOfCookies = parseInt(line)

  } else {

    cookieSizes = line.split(' ').map(el => parseInt(el)).sort(function (a, b) { return a - b })

    rl.close()

    calculateNumberOfHappyKids()

  }

  lineIndex += 1

})

function calculateNumberOfHappyKids() {

  if (numberOfKids == 0 || numberOfCookies == 0) {
    console.log(0)
    return
  }

  kidsPreferencesQueue = new Queue(new Node(kidsPreferences[0]))
  for (let i = 1; i < kidsPreferences.length; i++) {
    kidsPreferencesQueue.push(kidsPreferences[i])
  }

  cookieSizesQueue = new Queue(new Node(cookieSizes[0]))
  for (let j = 1; j < cookieSizes.length; j++) {
    cookieSizesQueue.push(cookieSizes[j])
  }

  while (cookieSizesQueue.head != null && kidsPreferencesQueue.head != null) {
    if (cookieSizesQueue.head.value >= kidsPreferencesQueue.head.value) {
      cookieSizesQueue.pop()
      kidsPreferencesQueue.pop()
      happyKidsCounter++
    } else {
      cookieSizesQueue.pop()
    }
  }

  console.log(happyKidsCounter)
}

