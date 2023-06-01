let product ='';

document.getElementById('idSelectEdit').style.display = 'none'

async function buscarProdutos() {
  const getproduct = await fetch(`https://back-newgpd.onrender.com/product/`);
  resposta = await getproduct.json();
  product = resposta
  console.table(resposta);
  
  listar()  
}

buscarProdutos();

function listar(){
    document.getElementById('tabelona').innerHTML=''
    product.forEach((element,idc) => {
        let mensalStatus = '';
        if(element.e_servico){
            mensalStatus = '<i class="fa fa-check" aria-hidden="true"></i>'
        }else{
            mensalStatus = '<i style="color:red"class="fa fa-times" aria-hidden="true"></i>'
        }
        
        document.getElementById('tabelona').innerHTML += `
        <tr>
        <td scope="row" ><b>${element.id}</b></td>
        <td scope="row" >${element.produto}</td>
        <td>${element.valor}</td>
        <td>${mensalStatus}</td>
        
        <td><a class="btn btn-primary" onclick="editSelect(${element.id},${idc})">Editar</a></td>
        <td><a class="btn btn-danger" onclick='deleteSelect(${element.id})'>Excluir</a></td>
        </tr>
       
        `;
    
      
    });
console.log('passou')
}

async function post(){
    let produtoPost = document.getElementById('produto').value
    let valorPost = document.getElementById('valor').value
    let mensalPost = document.getElementById('mensal').checked
    
   console.log('rodando', produtoPost , valorPost , mensalPost)
    let enviar = {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "produto": produtoPost,
                "valor": valorPost,
                "e_servico": mensalPost,
            }),
    }

    let enviando = await fetch('https://back-newgpd.onrender.com/product', enviar)
    console.log('no aguardo do retorno')
    console.log(enviando)
    buscarProdutos()
}

async function deleteSelect(id){
   console.log('deletando')
    let enviar = {
        method: "delete",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                id:id,
            }),
    }

    let enviando = await fetch('https://back-newgpd.onrender.com/product', enviar)
    console.log('no aguardo do retorno')
    console.log(enviando)
    buscarProdutos()
    alert('deletado')
}

function editSelect(idx,indice){
    document.getElementById('idSelectEdit').style.display = ''
    document.getElementById('idSelectEdit').innerHTML = `Edição do produto com ID ${idx}`
    document.getElementById('produto').value = product[indice].produto
    document.getElementById('valor').value = product[indice].valor
    document.getElementById('mensal').checked = product[indice].e_servico
    console.log(idx)
    modEdição(true,idx)
}

function modEdição(mod,idz){
    if(mod){
        document.getElementById('modo-post').innerHTML = 
        `<a class="btn btn-danger" onclick="upSelect(${idz})">Editar</a>`;
    }else{
        document.getElementById('modo-post').innerHTML = 
        '<a class="btn btn-primary" onclick="post()">Cadastrar</a>';
    }

}

async function upSelect(id){
    console.log("rodando a edicao" ,id)
    let produtoPost = document.getElementById('produto').value
    let valorPost = document.getElementById('valor').value
    let mensalPost = document.getElementById('mensal').checked
     let enviar = {
         method: "PUT",
         headers: { "content-type": "application/json", },
         body: JSON.stringify(
             {
                "produto": produtoPost,
                "valor": valorPost,
                "e_servico": mensalPost,
                 "id":id
             }),
     }
     
     let enviando = await fetch('https://back-newgpd.onrender.com/product', enviar)
     document.getElementById('idSelectEdit').style.display = 'none'
     console.log('no aguardo do retorno')
    console.log(enviando)
    location.reload()
 }