import { Octokit } from "octokit"

const octokit = new Octokit();

const response = await octokit.request("GET https://raw.githubusercontent.com/{owner}/{repo}/main/cards.json", {
  owner: "AndrewMotevich",
  repo: "online-store-data",
});

const result = JSON.parse(response.data);
console.log(result);

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