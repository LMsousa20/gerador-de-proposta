let product = "";

document.getElementById("idSelectEdit").style.display = "none";



async function buscarProdutos() {
  const getproduct = await fetch(`https://back-newgpd.onrender.com/tecnicos/`);
  resposta = await getproduct.json();
  product = resposta;
  console.table(resposta);

  listar();
}

buscarProdutos();

function listar() {
  document.getElementById("tabelona").innerHTML = "";
  product.forEach((element, idc) => {

    document.getElementById("tabelona").innerHTML += `
        <tr>
        <td scope="row" ><b>${element.id}</b></td>
        <td scope="row" >${element.nome}</td>
        <td>${element.cargo}</td>
        <td>${element.telefone}</td>
        
        <td><a class="btn btn-primary" onclick="editSelect(${element.id},${idc})">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
        </a></td>
        <td><a class="btn btn-danger" onclick='deleteSelect(${element.id})'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
        </tr>
       
        `;
  });
  console.log("passou");
}

async function post() {
  let nomePost = document.getElementById("nome").value;
  let cargoPost = document.getElementById("cargo").value;
  let telefonePost = document.getElementById("telefone").value;

  console.log("rodando", nomePost, cargoPost, telefonePost);
  let enviar = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nome: nomePost,
      cargo: cargoPost,
      telefone: telefonePost,
    }),
  };

  let enviando = await fetch(
    "https://back-newgpd.onrender.com/tecnicos/",
    enviar
  );
  console.log("no aguardo do retorno");
  console.log(enviando);
  buscarProdutos();
}

async function deleteSelect(id) {
  console.log("deletando");
  let enviar = {
    method: "delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  };

  let enviando = await fetch(
    "https://back-newgpd.onrender.com/tecnicos/",
    enviar
  );
  console.log("no aguardo do retorno");
  console.log(enviando);
  buscarProdutos();
  alert("deletado");
}

function editSelect(idx, indice) {
  document.getElementById("idSelectEdit").style.display = "";
  document.getElementById(
    "idSelectEdit"
  ).innerHTML = `Edição do nome com ID ${idx}`;
  document.getElementById("nome").value = product[indice].nome;
  document.getElementById("cargo").value = product[indice].cargo;
  document.getElementById("telefone").value = product[indice].telefone;
  console.log(idx);
  modEdição(true, idx);
}

function modEdição(mod, idz) {
  if (mod) {
    document.getElementById(
      "modo-post"
    ).innerHTML = `<a class="btn btn-danger" onclick="upSelect(${idz})">Editar</a>`;
  } else {
    document.getElementById("modo-post").innerHTML =
      '<a class="btn btn-primary" onclick="post()">Cadastrar</a>';
  }
}

async function upSelect(id) {
  console.log("rodando a edicao", id);
  let nomePost = document.getElementById("nome").value;
  let cargoPost = document.getElementById("cargo").value;
  let telefonePost = document.getElementById("telefone").value;
  let enviar = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      nome: nomePost,
      cargo: cargoPost,
      telefone: telefonePost,
      id: id,
    }),
  };

  let enviando = await fetch(
    "https://back-newgpd.onrender.com/tecnicos/",
    enviar
  );
  document.getElementById("idSelectEdit").style.display = "none";
  console.log("no aguardo do retorno");
  console.log(enviando);
  // location.reload();
}
