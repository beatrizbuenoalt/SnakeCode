
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score'); 

    const TAMANHO_BLOCO = 10;
    const LARGURA_CANVAS = 600;
    const ALTURA_CANVAS = 400;
    const VELOCIDADE = 100; 

    let cobrinha = [
        { x: 50, y: 50 },
        { x: 40, y: 50 },
        { x: 30, y: 50 }
    ];
    let direcao = 'direita';
    let comida = criarComida();
    let score = 0; 
    let gameOver = false;

    function desenharCobrinha() {
        cobrinha.forEach((segmento, index) => {
            ctx.fillStyle = index === 0 ? '#3D42B0' : 'white'; 
            ctx.fillRect(segmento.x, segmento.y, TAMANHO_BLOCO, TAMANHO_BLOCO);
        });
    }

    function criarComida() {
        const x = Math.floor(Math.random() * (LARGURA_CANVAS / TAMANHO_BLOCO)) * TAMANHO_BLOCO;
        const y = Math.floor(Math.random() * (ALTURA_CANVAS / TAMANHO_BLOCO)) * TAMANHO_BLOCO;
        return { x, y };
    }

    function desenharComida() {
        ctx.fillStyle = "orange";
        ctx.fillRect(comida.x, comida.y, TAMANHO_BLOCO, TAMANHO_BLOCO);
    }

    function moverCobrinha() {
        const novaCabeca = { ...cobrinha[0] };

        if (direcao === 'cima') novaCabeca.y -= TAMANHO_BLOCO;
        if (direcao === 'baixo') novaCabeca.y += TAMANHO_BLOCO;
        if (direcao === 'esquerda') novaCabeca.x -= TAMANHO_BLOCO;
        if (direcao === 'direita') novaCabeca.x += TAMANHO_BLOCO;

        cobrinha.unshift(novaCabeca);

        if (novaCabeca.x === comida.x && novaCabeca.y === comida.y) {
            comida = criarComida();
            score++; 
            atualizarScore();
        } else {
            cobrinha.pop(); 
        }
    }

    function verificarColisoes() {
        const cabeca = cobrinha[0];
    
        if (
            cabeca.x < 0 || cabeca.x >= LARGURA_CANVAS ||
            cabeca.y < 0 || cabeca.y >= ALTURA_CANVAS
        ) {
            gameOver = true;
        }
    
        for (let i = 1; i < cobrinha.length; i++) {
            if (cabeca.x === cobrinha[i].x && cabeca.y === cobrinha[i].y) {
                gameOver = true;
            }
        }
    }

    function mostrarGameOver() {
        document.getElementById('gameOver').style.display = 'block';
    }

    function atualizarScore() {
        scoreElement.textContent = score;
    }

    function reiniciarJogo() {
        cobrinha = [
            { x: 50, y: 50 },
            { x: 40, y: 50 },
            { x: 30, y: 50 }
        ];
        direcao = 'direita';
        comida = criarComida();
        score = 0;
        atualizarScore();
        gameOver = false;
        document.getElementById('gameOver').style.display = 'none';
        main();
    }

    function atualizarTela() {
        if (gameOver) {
            mostrarGameOver();
            return;
        }

        moverCobrinha();
        verificarColisoes();
        ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
        desenharComida();
        desenharCobrinha();
    }

    function main() {
        if (gameOver) {
            mostrarGameOver();
            return;
        }
    
        atualizarTela();
        setTimeout(main, VELOCIDADE);
    }
    

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && direcao !== 'baixo') direcao = 'cima';
        if (e.key === 'ArrowDown' && direcao !== 'cima') direcao = 'baixo';
        if (e.key === 'ArrowLeft' && direcao !== 'direita') direcao = 'esquerda';
        if (e.key === 'ArrowRight' && direcao !== 'esquerda') direcao = 'direita';
    });

  //MOBILE
function mudarDirecao(nova) {
    if (nova === 'cima' && direcao !== 'baixo') direcao = 'cima';
    if (nova === 'baixo' && direcao !== 'cima') direcao = 'baixo';
    if (nova === 'esquerda' && direcao !== 'direita') direcao = 'esquerda';
    if (nova === 'direita' && direcao !== 'esquerda') direcao = 'direita';
  }
  

    function restartGame() {
        reiniciarJogo();
    }

    main();