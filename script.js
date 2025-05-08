const slides = [
    // Slide 1 - Introdução
    `
    <div class="slide" id="slide1">
        <h1>Plataforma de Competições Sustentáveis entre Escolas</h1>
        <p>Um sistema para registrar, listar e rankear ações sustentáveis realizadas por escolas.</p>
        <div class="code">
            // Tecnologias usadas:
            Java (POO), Arquivos TXT, HTML/CSS/JS
        </div>
        <p class="highlight">Objetivo: Promover a sustentabilidade através da gamificação.</p>
    </div>
    `,

    // Slide 2 - Funcionalidades
    `
    <div class="slide" id="slide2">
        <h2>Funcionalidades do Sistema</h2>
        <ul>
            <li><strong>Cadastro</strong> de ações sustentáveis</li>
            <li><strong>Listagem</strong> completa de todas as ações</li>
            <li><strong>Busca filtrada</strong> por tipo de ação</li>
            <li><strong>Ranking</strong> automático das escolas</li>
            <li>Persistência em <strong>arquivo TXT</strong></li>
        </ul>
        <div class="code">
            public class MainApp {
                public static void main(String[] args) {
                    // Menu interativo
                }
            }
        </div>
    </div>
    `,

    // Slide 3 - Cadastro
    `
    <div class="slide" id="slide3">
        <h2>Cadastro e Armazenamento</h2>
        <p>Dados coletados para cada ação:</p>
        <ul>
            <li>Nome da escola</li>
            <li>Tipo de ação (ex: reciclagem, plantio)</li>
            <li>Quantidade (ex: 50 garrafas)</li>
            <li>Data (dd/mm/aaaa)</li>
        </ul>
        <div class="code">
            writer.write(escola + ";" + tipo + ";" + 
                       quantidade + ";" + data);
        </div>
        <p>Armazenamento em <span class="highlight">escolas.txt</span> (formato CSV).</p>
    </div>
    `,

    // Slide 4 - Busca e Listagem
    `
    <div class="slide" id="slide4">
        <h2>Busca e Listagem</h2>
        <p><strong>Listagem completa:</strong></p>
        <ul>
            <li>Lê o arquivo linha por linha</li>
            <li>Formata os dados para exibição</li>
        </ul>
        <p><strong>Busca por tipo:</strong></p>
        <ul>
            <li>Filtra ações usando <span class="highlight">equalsIgnoreCase()</span></li>
            <li>Feedback se nenhum resultado for encontrado</li>
        </ul>
        <div class="code">
            if (dados[1].equalsIgnoreCase(tipoBusca)) {
                // Exibe resultado
            }
        </div>
    </div>
    `,

    // Slide 5 - Ranking
    `
    <div class="slide" id="slide5">
        <h2>Lógica do Ranking</h2>
        <p>Como funciona:</p>
        <ol>
            <li>Agrega ações por escola usando <span class="highlight">HashMap</span></li>
            <li>Soma as quantidades de cada escola</li>
            <li>Ordena do maior para o menor</li>
        </ol>
        <div class="code">
            ranking.put(escola, ranking.getOrDefault(escola, 0) + quantidade);
            
            // Ordenação:
            listaRanking.sort((a, b) -> b.getValue()
                            .compareTo(a.getValue()));
        </div>
        <p>Saída formatada com posições (1º, 2º...).</p>
    </div>
    `,

    // Slide 6 - Impacto
    `
    <div class="slide" id="slide6">
        <h1>Impacto e Conclusão</h1>
        <ul>
            <li><strong>Transparência:</strong> Dados abertos sobre sustentabilidade</li>
            <li><strong>Gamificação:</strong> Ranking motiva competição saudável</li>
            <li><strong>Escalável:</strong> Pode ser integrado a bancos de dados</li>
        </ul>
        <p class="highlight">Próximos passos: Adicionar pontuação por tipo de ação e interface gráfica.</p>
    </div>
    `
];

// Renderizar slides e controles
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.slide-container');
    slides.forEach((slide, index) => {
        container.innerHTML += slide;
    });

    // Controles de navegação
    const navigation = document.createElement('div');
    navigation.className = 'navigation';
    navigation.innerHTML = `
        <button id="prev">Anterior</button>
        <button id="next">Próximo</button>
    `;
    document.body.appendChild(navigation);

    // Lógica de navegação
    let currentSlide = 0;
    const allSlides = document.querySelectorAll('.slide');

    function showSlide(index) {
        allSlides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }

    document.getElementById('next').addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    // Iniciar
    showSlide(0);
});