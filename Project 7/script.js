console.log("Array Cardio II");

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

console.table(people);

// Some and Every Checks
// Array.prototype.some() // is at least one person 18 or older?
const AnyonelegalAge = people.some(
  (person) => new Date().getFullYear() - person.year > 17
);
console.log({ AnyonelegalAge });
// Array.prototype.every() // is everyone 18 or older?
const EveryonelegalAge = people.every(
  (person) => new Date().getFullYear() - person.year > 17
);
console.log({ EveryonelegalAge });

// Display comments
console.table(comments);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 542328
const particularId = comments.find((comment) => comment.id === 542328);
console.log(particularId);

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 2039842
const index = comments.findIndex((comment) => comment.id === 2039842);
console.log({
  "Deleted Index": index,
  "Deleted comment": comments[index],
});
comments.splice(index, 1);
console.table(comments);
