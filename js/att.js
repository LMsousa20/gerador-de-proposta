let product = "";

async function buscarProdutos() {
  const getproduct = await fetch(`https://back-newgpd.onrender.com/ticket/`);
  resposta = await getproduct.json();
  product = resposta;
  console.table(resposta);

  listar();
}

buscarProdutos();

function listar() {
  document.getElementById("atendimentos").innerHTML = "";
  product.forEach((element, idc) => {

    document.getElementById("atendimentos").innerHTML += `
    
      <div class="card text-bg-success m-5" >
        <div class="card-header">CNPJ: ${element.cnpj}</div>
        <div class="card-body">
          <h5 class="card-title">${element.fantasia}</h5>
          <p class="card-text">${element.motivo}</p>
          <p class="card-text">${element.previsão}</p>
          <a href="#" class="btn btn-secondary" disabled>Concluir</a>
        </div>
        </div>
    

        
        `;
  });
  console.log("passou");
}



// async function post() {
//   let nomePost = document.getElementById("nome").value;
//   let cargoPost = document.getElementById("cargo").value;
//   let telefonePost = document.getElementById("telefone").value;

//   console.log("rodando", nomePost, cargoPost, telefonePost);
//   let enviar = {
//     method: "POST",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       nome: nomePost,
//       cargo: cargoPost,
//       telefone: telefonePost,
//     }),
//   };

//   let enviando = await fetch(
//     "https://back-newgpd.onrender.com/tecnicos/",
//     enviar
//   );
//   console.log("no aguardo do retorno");
//   console.log(enviando);
//   buscarProdutos();
// }

// async function deleteSelect(id) {
//   console.log("deletando");
//   let enviar = {
//     method: "delete",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       id: id,
//     }),
//   };

//   let enviando = await fetch(
//     "https://back-newgpd.onrender.com/tecnicos/",
//     enviar
//   );
//   console.log("no aguardo do retorno");
//   console.log(enviando);
//   buscarProdutos();
//   alert("deletado");
// }

// function editSelect(idx, indice) {
//   document.getElementById("idSelectEdit").style.display = "";
//   document.getElementById(
//     "idSelectEdit"
//   ).innerHTML = `Edição do nome com ID ${idx}`;
//   document.getElementById("nome").value = product[indice].nome;
//   document.getElementById("cargo").value = product[indice].cargo;
//   document.getElementById("telefone").value = product[indice].telefone;
//   console.log(idx);
//   modEdição(true, idx);
// }

// function modEdição(mod, idz) {
//   if (mod) {
//     document.getElementById(
//       "modo-post"
//     ).innerHTML = `<a class="btn btn-danger" onclick="upSelect(${idz})">Editar</a>`;
//   } else {
//     document.getElementById("modo-post").innerHTML =
//       '<a class="btn btn-primary" onclick="post()">Cadastrar</a>';
//   }
// }

// async function upSelect(id) {
//   console.log("rodando a edicao", id);
//   let nomePost = document.getElementById("nome").value;
//   let cargoPost = document.getElementById("cargo").value;
//   let telefonePost = document.getElementById("telefone").value;
//   let enviar = {
//     method: "PUT",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify({
//       nome: nomePost,
//       cargo: cargoPost,
//       telefone: telefonePost,
//       id: id,
//     }),
//   };

//   let enviando = await fetch(
//     "https://back-newgpd.onrender.com/tecnicos/",
//     enviar
//   );
//   document.getElementById("idSelectEdit").style.display = "none";
//   console.log("no aguardo do retorno");
//   console.log(enviando);
//   // location.reload();
// }
