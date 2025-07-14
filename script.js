document.addEventListener('DOMContentLoaded', () => {
    // JÚNIOR: Lista ATUALIZADA de unidades de chamados
    const unidadesChamados = [
        "CER BARRA", "ÁLVARO RAMOS", "LOURENÇO JORGE", "NOSSA SENHORA DO LORETO", "ROCHA MAIA",
        "SALGADO FILHO", "MATERNIDADE DA ROCINHA", "SEDE", "CIDADE DE DEUS", "COSTA BARROS",
        "DEL CASTILHO", "ENGENHO DE DENTRO", "JOÃO XXIII", "MADUREIRA", "MAGALHÃES BASTOS",
        "PACIÊNCIA", "ROCHA MIRANDA", "SENADOR CAMARÁ", "SEPETIBA", "VILA KENNEDY"
    ];

    const chamadosAbertosContainer = document.getElementById('chamadosAbertosContainer');
    const chamadosFechadosContainer = document.getElementById('chamadosFechadosContainer');

    const chamadosAbertosInputs = {};
    const chamadosFechadosInputs = {};

    const dataPlantaoInput = document.getElementById('dataPlantao');
    // JÚNIOR: Preenche a data automaticamente no formato YYYY-MM-DD para o input type="date"
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0]; // Ex: "2025-07-14"
    dataPlantaoInput.value = isoDate;

    // JÚNIOR: Pega a referência para o campo de seleção do técnico (do HTML)
    const tecnicoSelect = document.getElementById('tecnico');
    // Você pode definir um valor padrão aqui, se quiser, por exemplo:
    // tecnicoSelect.value = "Rodrigo Angelo";


    // JÚNIOR: FUNÇÃO GENÉRICA para criar os campos de chamados
    function criarCamposChamados(container, inputsObject) {
        unidadesChamados.forEach(unidade => {
            const div = document.createElement('div');
            div.classList.add('chamado-item');

            const label = document.createElement('label');
            label.textContent = `${unidade}:`;
            div.appendChild(label);

            const input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            input.min = 0;
            // Cria um ID único para o input combinando o ID do container e o nome da unidade
            input.id = `${container.id}-${unidade.replace(/\s/g, '-').replace(/[^\w-]/g, '')}`; // Remove espaços e outros caracteres especiais
            div.appendChild(input);
            inputsObject[unidade] = input; // Armazena a referência do input

            const btnMenos = document.createElement('button');
            btnMenos.textContent = '-1';
            btnMenos.addEventListener('click', () => {
                let currentValue = parseInt(input.value);
                if (isNaN(currentValue)) currentValue = 0;
                input.value = Math.max(0, currentValue - 1);
            });
            div.appendChild(btnMenos);

            const btnMais = document.createElement('button');
            btnMais.textContent = '+1';
            btnMais.addEventListener('click', () => {
                let currentValue = parseInt(input.value);
                if (isNaN(currentValue)) currentValue = 0;
                input.value = currentValue + 1;
            });
            div.appendChild(btnMais);

            container.appendChild(div);
        });
    }

    // Chama a função para criar os campos de chamados abertos
    criarCamposChamados(chamadosAbertosContainer, chamadosAbertosInputs);
    // Chama a função para criar os campos de chamados fechados
    criarCamposChamados(chamadosFechadosContainer, chamadosFechadosInputs);


    document.getElementById('gerarRelatorioBtn').addEventListener('click', () => {
        // JÚNIOR: Pega a data do input type="date" e formata para DD/MM/YYYY
        const dataInput = dataPlantaoInput.value; // Ex: "2025-07-14"
        let dataFormatada = '';
        if (dataInput) {
            const [year, month, day] = dataInput.split('-'); // Separa em partes
            dataFormatada = `${day}/${month}/${year}`; // Monta no formato desejado
        } else {
            // JÚNIOR: Adiciona validação para garantir que a data foi selecionada
            alert('Por favor, selecione a data do plantão.');
            return; // Impede a geração do relatório
        }

        // JÚNIOR: Pega o valor selecionado no <select> para o técnico
        const tecnico = tecnicoSelect.value;
        if (!tecnico) {
            // JÚNIOR: Adiciona validação para garantir que um técnico foi selecionado
            alert('Por favor, selecione o nome do técnico.');
            return; // Impede a geração do relatório
        }

        const plantao = document.getElementById('plantao').value;
        const agendamentos = document.getElementById('agendamentos').value;
        const tarefasRealizadas = document.getElementById('tarefasRealizadas').value;
        const pendencias = document.getElementById('pendencias').value;
        const fluxosCriados = document.getElementById('fluxosCriados').value;
        const recebimentoMaterial = document.getElementById('recebimentoMaterial').value;
        const movimentacaoEstoque = document.getElementById('movimentacaoEstoque').value;

        // Função auxiliar para formatar os chamados (abertos ou fechados)
        function formatarChamados(inputsObject, tituloVazio) {
            let texto = "";
            let chamadosRegistrados = false;
            for (const unidade of unidadesChamados) {
                const quantidade = parseInt(inputsObject[unidade].value);
                if (quantidade > 0) {
                    texto += `${unidade}: ${quantidade}\n`;
                    chamadosRegistrados = true;
                }
            }
            if (!chamadosRegistrados) {
                texto = tituloVazio + "\n";
            }
            return texto.trim();
        }

        const chamadosAbertosTexto = formatarChamados(chamadosAbertosInputs, "Nenhum chamado aberto registrado.");
        const chamadosFechadosTexto = formatarChamados(chamadosFechadosInputs, "Nenhum chamado fechado registrado.");


        // JÚNIOR: Monta o texto final do relatório com a data e técnico corrigidos
        const textoRelatorio = `Bom dia,

Dia: ${dataFormatada}
Técnico: ${tecnico}
Plantão ${plantao}

1. 📅 Agendamentos:
${agendamentos}

2. ✅ Tarefas realizadas:
${tarefasRealizadas}

Chamados abertos:
${chamadosAbertosTexto}

Chamados fechados:
${chamadosFechadosTexto}

3. 🚩 Pendências:
${pendencias}

4. 🔄 Fluxos Criados:
${fluxosCriados}

5. 📥 Recebimento de Material:
${recebimentoMaterial}

6. 📦 Movimentação de estoque:
${movimentacaoEstoque}
`;

        const blob = new Blob([textoRelatorio], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dataAtual = new Date(); // Pega a data atual para o nome do arquivo
        const nomeArquivo = `Relatorio_Plantao_${dataAtual.getFullYear()}-${String(dataAtual.getMonth() + 1).padStart(2, '0')}-${String(dataAtual.getDate()).padStart(2, '0')}.txt`;
        a.download = nomeArquivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert(`Relatório "${nomeArquivo}" gerado e baixado com sucesso!`);
    });
});