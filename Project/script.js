// console.log(myFunction("hello", true));
// printShit();

// function myFunction(a, b) {
//   return a + b;
// }
// function printShit() {
//   console.log("Hello");
//   console.log("World");
//   console.log("It's");
//   console.log("Me");
// }

// console.log(c(10, 25));

// var c = (a, b) => {
//   return a + b;
// };

const pokemon = ["Sylveon", "Volcarona", "Torterra", "Meowscarada"];
pokemon.unshift("Ceruledge");
pokemon.push("Miraidon");

console.log(pokemon);

var pokemonPick = pokemon.find((s) => s.startsWith("Cerul"));

console.log(pokemonPick);

console.log(pokemon);

var newPokemon = ["Bellibolt", "Venusaur"];

// newPokemon.reverse();

// newPokemon.forEach((element) => {
//   pokemon.splice(2, 0, element);
// });

for (let i = newPokemon.length - 1; i >= 0; i--) {
  const element = newPokemon[i];
  pokemon.splice(2, 0, element);
}

console.log(pokemon);
