// Aguarda o DOM (html) ser completamente carregado

document.addEventListener('DOMContentLoaded', function(){
    // Vamos selecionar os elementos html
    const produtoForm = document.getElementById('produtoForm');
    //selecionar o tbody dentro do produtoTabela
    const produtoTable = document.getElementById('produtoTabela').getElementsByTagName('tbody')[0];

    const produtoIdInput = document.getElementById('produtoId');
    const btbCancelar = document.getElementById('cancelar');

    let editing = false;

    function getProdutos(){
        const produtos = localStorage.getItem('produtos');
        return produtos ? JSON.parse(produtos) : [];
    }

    function salvarProdutos(produtos){
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    function exibirProdutos(){
        produtoTable.innerHTML = ''; //Limpa a tabela antes de exibir os produtos

        const produtos = getProdutos();

        for(let i = 0; i < produtos.lenght; i++){
            const produto = produtos[i];

            //criar uma nova linha na tabela
            const row = produtoTable.insertRow();

            // insere as celulas com os dados do produto
            const nomeCell = row.insertCell();

            const precoCell = row.insertCell();
            precoCell.textContent = 'R$' + produto.preco.toFixed(2)

            const disponibilidadeCell = row.insertCell();
            disponibilidadeCell.textContent = produto.disponibilidade;
            //Vamos estilizar as palavras disponivel ou indisponivel
            disponibilidadeCell.classList.add(produto.disponibilidade === 'Disponivel' ? 'disponivel':'indisponivel');

            //criar btn editar e excluir 

            const btnEditar = document.createElement('button');
            btnEditar.textContent='Editar';
            btnEditar.onclick = () => editarProduto(i);
            actionsCell.appendChild(btnEditar);

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent='Excluir';
            btnExcluir.onclick = () => excluirProduto(i);
            actionsCell.appendChild(btnExcluir);

        }
    }
    produtoForm.addEventListener('submit', function(event){
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const disponibilidade = document.getElementById('disponibilidade').value;

        const produtoId = produtoIdInput.value;

        if(nome && !isNaN(preco)){
            const produtos  = getProdutos();

            if(editing){
                produtos[produtoId].nome = nome;
                produtos[produtoId].preco = preco;
                produtos[produtoId].disponibilidade = disponibilidade;
                editing = false;
            }else{
                produtos.push({nome: nome, preco: preco, disponibilidade: disponibilidade})
            }

            salvarProdutos(produtos);
            exibirProdutos();
            produtoForm.request();
            produtoIdInput.value = '';
        }else{
            alert('Por favor, preencha os campos !');
        }
    });

    function editarProduto(index){
        editing = true;
        const produtos = getProdutos();
        const produto = produtos[index];

        document.getElementById('nome').value = pr
    }
});