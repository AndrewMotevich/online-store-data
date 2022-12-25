//import GIT HUB octokit library
import { Octokit } from "octokit"

function startApp(){
  const allCardsButton = document.createElement("button");
  const div = document.createElement("div");
  
  document.body.style = "display: flex; flex-direction: column; align-items: center";
  
  allCardsButton.innerText = "All Cards";
  allCardsButton.style = "width 200px; height: 80px; font-size: 50px";
  div.style = "display: flex; flex-direction: column; align-items: center"
  document.body.append(allCardsButton);

  for (let i = 0; i < 5; i+= 1){
    const numButton = document.createElement('button');
    numButton.style = "width 200px; height: 80px; font-size: 50px; margin-top: 10px"
    numButton.innerText = i;
    div.append(numButton);
  }

  document.body.append(div);
  addEventListener();
}

function addEventListener(){
  const card = document.createElement("div");
  card.style = "display: flex; flex-direction: column; width: 400px; height: 600px; font-size: 13px; background-color: rgb(255,0,255,0.5)";
  document.body.addEventListener("click",async (event) => {
    switch (event.target.innerText) {
      case "All Cards":
        getAllCards();
        break;
      case "0":
        document.body.innerHTML = "";
        const card0 = await getCard(0);
        document.body.append(card0);
        break;
      case "1":
        document.body.innerHTML = "";
        const card1 = await getCard(1);
        document.body.append(card1);
        break;
      case "2":
        document.body.innerHTML = "";
        const card2 = await getCard(2);
        document.body.append(card2);
        break;
      case "3":
        document.body.innerHTML = "";
        const card3 = await getCard(3);
        document.body.append(card3);
        break;
      case "4":
        document.body.innerHTML = "";
        const card4 = await getCard(4);
        document.body.append(card4);
        break;
    }
      
  })
}

async function getCard(num){
  const octokit = new Octokit();
  //Get data from github
  const response = await octokit.request("GET https://raw.githubusercontent.com/{owner}/{repo}/main/cards/{num}.json", {
    owner: "AndrewMotevich",
    repo: "online-store-data",
    num: `${num}`
   });

   const result = JSON.parse(response.data);
   console.log(result)

   const card = document.createElement("div");
   card.style = "display: flex; flex-direction: column; width: 400px; height: 500px; font-size: 13px; background-color: rgb(255,0,255,0.5)";

   for (let key in result){
    const div = document.createElement("div");
    div.style = "width: 250px; margin-top: 3px; text-align: start;"
    div.innerText = `${key}: ${result[key]}`;
    card.append(div);
  }
  console.log(card);
   return card
}

async function getAllCards(){
  document.body.innerHTML = "";
  //new instance of class Octokit
  const octokit = new Octokit();
  //Get data from github
  const response = await octokit.request("GET https://raw.githubusercontent.com/{owner}/{repo}/main/cards.json", {
    owner: "AndrewMotevich",
    repo: "online-store-data",
  });
  //parse data
  const result = JSON.parse(response.data);
  console.log(result);
  //create cards
  for (let index in result){  
    const card = document.createElement("div");
    card.style = "display: flex; flex-direction: column; width: 250px; height: 400px; font-size: 10px; background-color: rgb(255,0,255,0.5)";
    for (let key in result[index]){
      const div = document.createElement("div");
      div.style = "width: 250px; margin-top: 3px; text-align: start;"
      div.innerText = `${key}: ${result[index][key]}`;
      card.append(div);
    }
    document.body.style = "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-gap: 5px"
    document.body.append(card);
  }
}

startApp();