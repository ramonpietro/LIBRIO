//RECUPERAR O ID DETALHES DO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'));

//PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

if(item){
    console.log('Produto encontrado: ',item);

    //Alimentar com os valores do item
    $("#imagem-detalhe").attr('src',item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#descricao").html(item.descricao);
    $("#preco").html(formatarPreco(item.preco))
    $("#preco-final").html(formatarPreco(item.preco_promocional));
    /*
        para os alunos fazer o resto
    */

    var tabelaDetalhes = $("#tabdetalhes");

    item.detalhes.forEach(detalhe => {
        var linha = `
            <tr>
                <td>${detalhe.caracteristica}</td>
                <td>${detalhe.detalhes}</td>
            </tr>
        `;
        tabelaDetalhes.append(linha);
    });

}else{
    console.log('Produto não encontrado');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

//FUNÇÃO PARA ADICIONAR AO CARRINHO
function adicionarAoCarrinho(item, quantidade){
    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id);

    if(itemNoCarrinho){
        //JÁ TEM NO CARRINHO //ADICIONAR QUANTIDADE
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;
    }else{
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        })
    }
    // ATUALIZAR O LOCALSTORAGE DO CARRINHO
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
 //CLICOU NO ADICIONAR CARRINHO
 $(".add-cart").on('click', function(){
    adicionarAoCarrinho(item, 1);

    toastCenter = app.toast.create({
        text: `${item.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
    });
    toastCenter.open();
 })