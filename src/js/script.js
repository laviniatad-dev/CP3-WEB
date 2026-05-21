/// CARRINHO ///

let carrinho = JSON.parse(
    localStorage.getItem('carrinho')
) || []

const addItem = document.querySelectorAll('.carrinho-btn')

addItem.forEach(item => {
    item.addEventListener('click', () => {
        const card = item.parentElement
        const nome = card.querySelector('h4').innerText
        const textoPreco = card.querySelector('.preco').innerText
        const preco = Number(
            textoPreco.replace('Valor: R$', '')
        )
        
        carrinho.push({
            nome,
            preco
        })

        localStorage.setItem(
            'carrinho',
            JSON.stringify(carrinho)
        )

        atualizarCarrinho()
    })
})

function atualizarCarrinho() {
    const lista = document.getElementById('itens-carrinho')
    const totalHTML = document.getElementById('valor-total')
    if (!lista || !totalHTML) {
        return
    }

    lista.innerHTML = ''

    carrinho.forEach((item, index) => {

    lista.innerHTML += `
        <div class="item-carrinho">
            <p>${item.nome} - R$ ${item.preco}</p>
            <button onclick="removerItem(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
        </div>
    `
})

    const total = carrinho.reduce((acc, item) => {
        return acc + item.preco
    }, 0)

    totalHTML.innerText = total
}

atualizarCarrinho()

function removerItem(index) {
    carrinho.splice(index, 1)
    localStorage.setItem('carrinho', JSON.stringify(carrinho))

    atualizarCarrinho()
}

const botaoCupom = document.querySelector('.cupom')

let descontoAplicado = false

if (botaoCupom) {
    botaoCupom.addEventListener('click', () =>{
        if (descontoAplicado == false) {
            const total = carrinho.reduce((acc, item) => {
                return acc + item.preco
            }, 0)
            const totalDesconto = total * 0.9
            document.getElementById('valor-total').innerText = totalDesconto.toFixed(2)
            descontoAplicado = true
        }
    })
}

const finalizar = document.querySelector('.finalizar')

if (finalizar) {
    finalizar.addEventListener('click', () => {
        const mensagem = document.querySelector('.mensagem-compra')
        mensagem.classList.add('ativa')
        setTimeout(() => {
            mensagem.classList.remove('ativa')
        }, 3000)
        carrinho = []
        localStorage.removeItem('carrinho')
        atualizarCarrinho()
    })
}