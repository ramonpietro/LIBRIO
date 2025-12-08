fetch('js/backend.json')
.then(response => response.json())
.then(data =>{
    //SALVAR OS DADOS VINDOS DO BACK-END
    //VAMOS UTILIZAR O LOCALSTORAGE
    localStorage.setItem('produtos',JSON.stringify(data));
    console.log('Dados dos produtos salvos no localStorage');

    setTimeout(() => {
        //ESVAZIAR A ÁREA DE PRODUTOS
        $("#produtos").empty();

        data.forEach(produto =>{
            var produtoHTML = `
                <a data-id="${produto.id} href="#" class="item-card">
                    <div class="img-container">
                        <img src="${produto.imagem}">
                    </div>
                    <div  class="nome-aval">
                        <span class="nome-cinza">${produto.nome}</span>
                        <span class="bold margin-right">
                            <i class="mdi mdi-star"></i>
                            ${produto.rating}
                        </span>
                    </div>
                    <div class="preco">${produto.preco_promocional.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</div>
                </a>
            `;
            $("#produtos").append(produtoHTML);
        });

        $(".item-card").on('click', function(){
            var id = $(this).attr('data-id');
            localStorage.setItem('detalhe',id);
            app.views.main.router.navigate('/detalhes/');
        });

    },1500);
    
    
})
.catch(error => console.error('Erro ao fazer fetch dos dados: '+error));

// VER QUANTOS ITENS TEM NO CARRINHO
setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // ALIMENTAR O CONTADOR DA SACOLA
    $('.btn-carrinho').attr('data-count', carrinho.length);
}, 300);