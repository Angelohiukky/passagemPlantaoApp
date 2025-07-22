document.addEventListener('DOMContentLoaded', () => {
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
    const today = new Date();
    const isoDate = today.toISOString().split('T')[0];
    dataPlantaoInput.value = isoDate;

    const tecnicoSelect = document.getElementById('tecnico');
    const plantaoSelect = document.getElementById('plantao');
    const numeroWhatsappInput = document.getElementById('numeroWhatsappInput');

    function criarCamposChamados(container, inputsObject) {
        unidadesChamados.forEach(unidade => {
            const div = document.createElement('div');
            div.classList.add('chamado-item');

            const label = document.createElement('label');
            label.textContent = `${unidade}:`;
            div.appendChild(label);

            const btnMenos = document.createElement('button');
            btnMenos.textContent = '-1';
            btnMenos.addEventListener('click', () => {
                let currentValue = parseInt(input.value);
                if (isNaN(currentValue)) currentValue = 0;
                input.value = Math.max(0, currentValue - 1);
            });
            div.appendChild(btnMenos);

            const input = document.createElement('input');
            input.type = 'number';
            input.value = 0;
            input.min = 0;
            input.id = `${container.id}-${unidade.replace(/\s/g, '-').replace(/[^\w-]/g, '')}`;
            div.appendChild(input);
            inputsObject[unidade] = input;

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

    criarCamposChamados(chamadosAbertosContainer, chamadosAbertosInputs);
    criarCamposChamados(chamadosFechadosContainer, chamadosFechadosInputs);

    // Função para coletar e formatar o relatório
    function getRelatorioText() {
        const dataInput = dataPlantaoInput.value;
        let dataFormatada = '';
        if (dataInput) {
            const [year, month, day] = dataInput.split('-');
            dataFormatada = `${day}/${month}/${year}`;
        } else {
            alert('Por favor, selecione a data do plantão.');
            return null;
        }

        const tecnico = tecnicoSelect.value;
        if (!tecnico) {
            alert('Por favor, selecione o nome do técnico.');
            return null;
        }

        const plantao = plantaoSelect.value;
        const agendamentos = document.getElementById('agendamentos').value;
        const tarefasRealizadas = document.getElementById('tarefasRealizadas').value;
        const pendencias = document.getElementById('pendencias').value;
        const fluxosCriados = document.getElementById('fluxosCriados').value;
        const recebimentoMaterial = document.getElementById('recebimentoMaterial').value;
        const movimentacaoEstoque = document.getElementById('movimentacaoEstoque').value;

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

        // Lógica para a saudação dinâmica
        let saudacao;
        if (plantao === "Diurno") {
            saudacao = "Boa noite,";
        } else if (plantao === "Noturno") {
            saudacao = "Bom dia,";
        } else {
            saudacao = "Olá,";
        }

        const textoRelatorio = `${saudacao}

Dia: ${dataFormatada}
Técnico: ${tecnico}
Plantão ${plantao}

1. Agendamentos:
${agendamentos || " "}

2. Tarefas realizadas:
${tarefasRealizadas || " "}

Chamados abertos:
${chamadosAbertosTexto}

Chamados fechados:
${chamadosFechadosTexto}

3. Pendências:
${pendencias || " "}

4. Fluxos Criados:
${fluxosCriados || " "}

5. Recebimento de Material:
${recebimentoMaterial || " "}

6. Movimentação de estoque:
${movimentacaoEstoque || " "}
`;
        return textoRelatorio;
    }


    // Listener para o botão de Gerar e Baixar Relatório .txt
    document.getElementById('gerarRelatorioBtn').addEventListener('click', () => {
        const textoRelatorio = getRelatorioText();
        if (!textoRelatorio) return;

        const blobTxt = new Blob([textoRelatorio], { type: 'text/plain;charset=utf-8' });
        const urlTxt = URL.createObjectURL(blobTxt);
        const aTxt = document.createElement('a');
        aTxt.href = urlTxt;
        const dataAtualParaNomeArquivo = new Date();
        const nomeArquivoTxt = `Relatorio_Plantao_${dataAtualParaNomeArquivo.getFullYear()}-${String(dataAtualParaNomeArquivo.getMonth() + 1).padStart(2, '0')}-${String(dataAtualParaNomeArquivo.getDate()).padStart(2, '0')}.txt`;
        aTxt.download = nomeArquivoTxt;
        document.body.appendChild(aTxt);
        aTxt.click();
        document.body.removeChild(aTxt);
        URL.revokeObjectURL(urlTxt);

        alert(`Relatório "${nomeArquivoTxt}" gerado e baixado com sucesso!`);

        // JÚNIOR: Toda a lógica de geração e download do arquivo .CSV foi removida daqui.
        // A linha "alert(`Planilha "${nomeArquivoCsv}" gerada e baixada com sucesso!`);" também foi removida.
    });


    // Listener para o novo botão de Enviar para WhatsApp
    document.getElementById('enviarWhatsappBtn').addEventListener('click', () => {
        const textoRelatorio = getRelatorioText();
        if (!textoRelatorio) return;

        let numeroDigitado = numeroWhatsappInput.value.trim();

        if (!numeroDigitado) {
            alert('Por favor, insira o número do WhatsApp para envio.');
            numeroWhatsappInput.focus();
            return;
        }

        const numeroLocalLimpo = numeroDigitado.replace(/\D/g, '');

        if (numeroLocalLimpo.length !== 9) {
            alert('Por favor, insira um número de celular válido com 9 dígitos (Ex: 999999999).');
            numeroWhatsappInput.focus();
            return;
        }

        const numeroWhatsappFinal = `5521${numeroLocalLimpo}`;

        const encodedText = encodeURIComponent(textoRelatorio);

        const whatsappUrl = `https://wa.me/${numeroWhatsappFinal}?text=${encodedText}`;

        window.open(whatsappUrl, '_blank');

        alert('Redirecionando para o WhatsApp com o relatório pronto para envio!');
    });
});