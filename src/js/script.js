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

    carrinho.forEach(item => {
        lista.innerHTML += `
            <p>${item.nome} - R$ ${item.preco}</p>
        `
    })

    const total = carrinho.reduce((acc, item) => {
        return acc + item.preco
    }, 0)

    totalHTML.innerText = total
}

atualizarCarrinho()