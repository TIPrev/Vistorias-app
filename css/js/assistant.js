// ============================================================
// ASSISTENTE DE VISTORIA
// ============================================================

(function () {
  try {
    const assistantBtn = document.querySelector("#assistant-btn");
    const assistantModal = document.querySelector("#assistant-modal");
    const assistantCloseBtn = document.querySelector("#assistant-close-btn");
    const assistantBackBtn = document.querySelector("#assistant-back-btn");
    const assistantContent = document.querySelector("#assistant-content");
    const assistantResponse = document.querySelector("#assistant-response");
    const assistantResponseText = document.querySelector("#assistant-response-text");
    const quickBtns = document.querySelectorAll(".assistant-quick-btn");

    // Respostas fixas do assistente
    const responses = {
      "nova-vistoria": {
        title: "📝 Nova Vistoria",
        text: `<strong>Como preencher uma nova vistoria:</strong>
        <br><br>
        <strong>Passo 1: Dados do cliente</strong>
        • Digite o nome completo do cliente
        • Confirme o telefone para contato
        <br><br>
        <strong>Passo 2: Endereço</strong>
        • Digite ou confirme o CEP
        • Complete a rua, número e complemento
        • Adicione bairro, cidade e UF
        <br><br>
        <strong>Passo 3: Informações da vistoria</strong>
        • Data e hora da vistoria
        • Metragem do imóvel em m²
        • Tipo (Entrada ou Saída)
        • Marque se há mobília e qualidade
        <br><br>
        <strong>Passo 4: Aceite do cliente</strong>
        • Nome do responsável pelo aceite
        • Documento (opcional)
        • Observações (opcional)
        • Marque que acompanhou a vistoria
        <br><br>
        <strong>✓ Clique em "Finalizar vistoria" para salvar</strong>`
      },
      "agendamentos": {
        title: "📅 Agendamentos",
        text: `<strong>Como gerenciar agendamentos:</strong>
        <br><br>
        <strong>Conferir antes de enviar:</strong>
        • Cliente: nome correto e atualizado
        • Endereço: completo e verificado
        • Data e horário: confirmados com o cliente
        • Telefone: com DDD para contato
        • Código do imóvel: preenchido corretamente
        <br><br>
        <strong>Dicas importantes:</strong>
        • Verifique o CEP antes de salvar
        • Confirme data e hora com o cliente
        • Adicione observações se houver detalhes importantes
        • Envie a mensagem no WhatsApp apenas quando confirmar
        <br><br>
        <strong>Status disponíveis:</strong>
        • Aguardando envio
        • Mensagem enviada
        • Confirmado
        • Vistoria iniciada
        • Reagendar
        • Cancelado
        • Finalizado
        <br><br>
        <strong>Dica:</strong> Use a aba "Filtros" para acompanhar os status`
      },
      "campos-obrigatorios": {
        title: "✓ Campos Obrigatórios",
        text: `<strong>Campos que SEMPRE devem ser preenchidos:</strong>
        <br><br>
        <strong>Em Nova Vistoria:</strong>
        ✓ Cliente ou unidade do imóvel
        ✓ Endereço completo (rua, número, bairro, cidade, UF)
        ✓ Nome do responsável pelo aceite
        ✓ Telefone para contato
        ✓ Data da vistoria
        ✓ Hora da vistoria
        ✓ Tipo (Entrada ou Saída)
        ✓ Metragem do imóvel
        <br><br>
        <strong>Recomendados:</strong>
        • Fotos do imóvel (observações)
        • Observações detalhadas
        • Documento do responsável
        <br><br>
        <strong>Em Agendamentos:</strong>
        ✓ Data e hora
        ✓ Código do imóvel
        ✓ Nome do cliente
        ✓ Telefone do cliente
        ✓ Tipo do imóvel
        ✓ CEP (para validar endereço)
        ✓ Rua, número, bairro, cidade, UF
        <br><br>
        <strong>⚠ Sem preencher estes campos não é possível salvar!</strong>`
      },
      "conferir": {
        title: "🔍 Conferir Antes de Salvar",
        text: `<strong>Checklist para revisar antes de finalizar:</strong>
        <br><br>
        <strong>1. Dados do cliente:</strong>
        ☐ Nome está correto e completo
        ☐ Telefone tem DDD correto
        ☐ Email ou referência anotados
        <br><br>
        <strong>2. Endereço:</strong>
        ☐ Rua e número confirmados
        ☐ Complemento (apto, sala, etc) correto
        ☐ CEP validado
        ☐ Bairro e cidade corretos
        <br><br>
        <strong>3. Responsável:</strong>
        ☐ Nome do responsável está correto
        ☐ Documento anotado (se disponível)
        ☐ Assinatura/aceite confirmado
        <br><br>
        <strong>4. Observações:</strong>
        ☐ Problemas ou pontos importantes anotados
        ☐ Referências de fotos ou anexos
        ☐ Descrição clara e legível
        <br><br>
        <strong>5. Status e finalização:</strong>
        ☐ Revisou todas as informações
        ☐ Conferiu datas e horários
        ☐ Tudo correto e legível
        <br><br>
        <strong>✅ Agora sim, clique "Finalizar vistoria"!</strong>`
      }
    };

    // Abrir modal
    function openModal() {
      assistantModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    // Fechar modal
    function closeModal() {
      assistantModal.classList.add("hidden");
      document.body.style.overflow = "";
      resetContent();
    }

    // Mostrar resposta
    function showResponse(action) {
      const response = responses[action];
      if (!response) return;

      assistantContent.classList.add("hidden");
      assistantResponse.classList.remove("hidden");
      assistantResponseText.innerHTML = `<h4>${response.title}</h4>${response.text}`;
    }

    // Voltar ao menu principal
    function resetContent() {
      assistantContent.classList.remove("hidden");
      assistantResponse.classList.add("hidden");
      assistantResponseText.innerHTML = "";
    }

    // Event listeners
    assistantBtn.addEventListener("click", openModal);
    assistantCloseBtn.addEventListener("click", closeModal);
    assistantBackBtn.addEventListener("click", resetContent);

    quickBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        showResponse(action);
      });
    });

    // Fechar modal ao clicar fora
    assistantModal.addEventListener("click", (e) => {
      if (e.target === assistantModal) {
        closeModal();
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !assistantModal.classList.contains("hidden")) {
        closeModal();
      }
    });

  } catch (erro) {
    console.error("[Assistente] Erro ao inicializar:", erro);
    // App continua funcionando mesmo se o assistente falhar
  }
})();
