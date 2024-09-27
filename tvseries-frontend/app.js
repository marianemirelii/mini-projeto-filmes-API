let paginaAtual = 1;
let limiteItens = 5;
let tituloBusca = '';

async function buscarSerie() {
    const tituloUsuario = document.getElementById('searchInput').value;
    tituloBusca = tituloUsuario;
    paginaAtual = 1; // Resetar para a primeira página na nova busca
    await carregarSeries();
}

async function carregarSeries() {
    const url = `http://localhost:3000/series?titulo=${tituloBusca}&pagina=${paginaAtual}&limite=${limiteItens}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const dados = await response.json();
        
        console.log(dados); // Verificar a resposta da API

        // Exibe séries do campo "data", não "series"
        exibirSeries(dados.data); 
    } catch (error) {
        console.error('Erro ao buscar séries:', error);
    }
}


function exibirSeries(series) {
    const container = document.getElementById('seriesContainer');
    container.innerHTML = ''; // Limpa o container antes de exibir os novos resultados
    series.forEach(serie => {
        const div = document.createElement('div');
        div.className = 'series-item';

        // Cria a string com os gêneros
        const generos = serie.generos ? serie.generos.join(', ') : 'Gênero não disponível';

        // Monta o conteúdo de cada série com título, imagem, gêneros e resumo
        div.innerHTML = ` <div class="card">
                <img src="${serie.imagem}" alt="${serie.titulo}">
                <div class="card-description">
                    <h3>${serie.titulo}</h3>
                    <div class="series-genres"><strong>Gêneros:</strong> ${serie.generos ? serie.generos.join(', ') : 'Gênero não disponível'}</div>
                    <div class="series-summary">${serie.resumo}</div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function atualizarPagina() {
    limiteItens = document.getElementById('limite').value;
    carregarSeries();
}

function paginaAnterior() {
    if (paginaAtual > 1) {
        paginaAtual--;
        carregarSeries();
    }
}

function proximaPagina() {
    paginaAtual++;
    carregarSeries();
}
