let catFact = "";
const catFactParagraph = document.getElementById("cat-fact-paragraph");
const catFactCardBody = document.getElementById("cat-fact-card-body");

getRandomCatFact();
setupGetCatFactButton();

function setupGetCatFactButton() {
  const btn = document.createElement("button");
  btn.classList.add("btn", "btn-primary");
  btn.textContent = "Generate Fact";
  btn.onclick = () => getRandomCatFact();
  catFactCardBody.append(btn);
}

async function getRandomCatFact() {
  const url = new URL(`https://catfact.ninja/fact/`);
  const response = await fetch(url);
  if (response.status === 200) {
    const jsonResponse = await response.json();
    catFact = jsonResponse.fact;
    catFactParagraph.innerText = catFact;
  }
}
