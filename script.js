function calcular() {
    // Capturar valores do formulário
    let larguraPeca = parseFloat(document.getElementById('larguraPeca').value);
    let comprimentoPeca = parseFloat(document.getElementById('comprimentoPeca').value);
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let larguraChapa = parseFloat(document.getElementById('larguraChapa').value);
    let comprimentoChapa = parseFloat(document.getElementById('comprimentoChapa').value);
    let espessura = parseFloat(document.getElementById('espessura').value) / 10; // Converter mm para cm

    if (isNaN(larguraPeca) || isNaN(comprimentoPeca) || isNaN(quantidade) ||
        isNaN(larguraChapa) || isNaN(comprimentoChapa) || isNaN(espessura) || quantidade <= 0) {
        alert('Preencha todos os campos com valores válidos.');
        return;
    }

    // Adiciona 0.5 cm em cada lado da peça
    larguraPeca += 1;
    comprimentoPeca += 1;

    // Área total das peças em cm²
    let areaPeca = larguraPeca * comprimentoPeca;
    let areaTotalCm2 = areaPeca * quantidade;
    let areaTotalM2 = areaTotalCm2 / 10000;

    // Área da chapa em cm²
    let areaChapa = larguraChapa * comprimentoChapa;

    // Quantidade de chapas necessárias
    let quantidadeChapas = Math.ceil(areaTotalCm2 / areaChapa);

    // Peso total (densidade do aço ≈ 7.85 g/cm³)
    let pesoTotal = areaTotalM2 * espessura * 7.85 * 100; 

    // Atualizar resultados
    document.getElementById('resultadoChapas').textContent = `Quantidade de chapas: ${quantidadeChapas}`;
    document.getElementById('resultadoArea').textContent = `Área total (m²): ${areaTotalM2.toFixed(2)}`;
    document.getElementById('resultadoPeso').textContent = `Peso total (kg): ${pesoTotal.toFixed(2)}`;

    // Desenhar a chapa e as peças
    desenharChapa(larguraChapa, comprimentoChapa, larguraPeca, comprimentoPeca, quantidade);
}

function desenharChapa(larguraChapa, comprimentoChapa, larguraPeca, comprimentoPeca, quantidade) {
    const canvas = document.getElementById('desenhoChapa');
    const ctx = canvas.getContext('2d');

    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ajustar a escala para o tamanho do canvas
    const escala = Math.min(canvas.width / larguraChapa, canvas.height / comprimentoChapa);

    // Desenhar a chapa
    ctx.strokeStyle = "#000";
    ctx.strokeRect(0, 0, larguraChapa * escala, comprimentoChapa * escala);

    // Preencher com as peças (tentativa de encaixe)
    let x = 0, y = 0;
    for (let i = 0; i < quantidade; i++) {
        // Se não couber, pular para a próxima linha
        if (x + larguraPeca * escala > larguraChapa * escala) {
            x = 0;
            y += comprimentoPeca * escala;
        }

        // Parar se não couber mais
        if (y + comprimentoPeca * escala > comprimentoChapa * escala) break;

        // Desenhar peça
        ctx.fillStyle = "#007BFF";
        ctx.fillRect(x, y, larguraPeca * escala, comprimentoPeca * escala);
        ctx.strokeRect(x, y, larguraPeca * escala, comprimentoPeca * escala);

        // Mover para o próximo ponto
        x += larguraPeca * escala;
    }
}
