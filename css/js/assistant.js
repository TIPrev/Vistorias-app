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
        text: `<p><strong>Para criar uma vistoria, siga os passos:</strong></p>
        <ul>
          <li>Preencha <strong>cliente/unidade do imóvel</strong> corretamente</li>
          <li>Confirme o <strong>endereço completo</strong> (rua, número, bairro, cidade, UF)</li>
          <li>Adicione <strong>responsável</strong> e <strong>telefone</strong> de contato</li>
          <li>Defina <strong>data e horário</strong> da vistoria</li>
          <li>Tire <strong>fotos</strong> e adicione observações</li>
          <li>Antes de salvar, confira se <strong>todos os dados pertencem ao imóvel correto</strong></li>
        </ul>
        <p><strong>⚠️ Dica importante:</strong> Evite copiar dados da vistoria anterior. Sempre confirme manualmente que os dados são do cliente atual.</p>`
      },
      "agendamentos": {
        title: "📅 Agendamentos",
        text: `<p><strong>Antes de confirmar um agendamento:</strong></p>
        <ul>
          <li>Confira <strong>data e horário</strong> com o cliente</li>
          <li>Valide o <strong>nome e telefone</strong> do responsável</li>
          <li>Confirme o <strong>endereço completo</strong></li>
          <li>Verifique o <strong>código do imóvel</strong> e tipo</li>
          <li>Defina o <strong>status</strong> corretamente</li>
        </ul>
        <p><strong>⚠️ Ao enviar pelo WhatsApp:</strong> Confira se o <strong>número é do cliente atual</strong>. Nunca reutilize contatos de agendamentos anteriores sem confirmar.</p>`
      },
      "campos-obrigatorios": {
        title: "✅ Campos Obrigatórios",
        text: `<p><strong>Em Nova Vistoria - TODOS são obrigatórios:</strong></p>
        <ul>
          <li>Cliente ou unidade do imóvel</li>
          <li>Endereço completo</li>
          <li>Nome do responsável</li>
          <li>Telefone para contato</li>
          <li>Data da vistoria</li>
          <li>Horário da vistoria</li>
          <li>Status e observações</li>
          <li>Fotos ou evidências</li>
        </ul>
        <p><strong>Em Agendamentos - TODOS são obrigatórios:</strong></p>
        <ul>
          <li>Data e hora</li>
          <li>Código do imóvel</li>
          <li>Nome do cliente</li>
          <li>Telefone do cliente</li>
          <li>Tipo de imóvel</li>
          <li>Endereço completo</li>
        </ul>
        <p><strong>⚠️ Sem telefone:</strong> O envio pelo WhatsApp deve ser bloqueado.</p>`
      },
      "conferir": {
        title: "🔍 Revisar Antes de Salvar",
        text: `<p><strong>Checklist final - Revise tudo:</strong></p>
        <ul>
          <li>☐ <strong>Fotos anexadas</strong> corretamente</li>
          <li>☐ <strong>Observações claras</strong> e legíveis</li>
          <li>☐ <strong>Endereço correto</strong> e completo</li>
          <li>☐ <strong>Responsável correto</strong> e nomes sem erro</li>
          <li>☐ <strong>Telefone atualizado</strong> do cliente</li>
          <li>☐ <strong>Status definido</strong> corretamente</li>
          <li>☐ <strong>Dados do cliente atual</strong> - não anterior</li>
        </ul>
        <p><strong>⚠️ Cuidado:</strong> Evite salvar usando dados do atendimento anterior. Sempre confirme que as informações estão atualizadas.</p>`
      },
      "whatsapp": {
        title: "📲 Mensagem WhatsApp",
        text: `<p><strong>Antes de enviar pelo WhatsApp:</strong></p>
        <ul>
          <li>Confira se o <strong>nome do cliente</strong> é o ATUAL</li>
          <li>Confirme o <strong>telefone</strong> do cliente (DDD + número)</li>
          <li>Valide <strong>data, horário e endereço</strong></li>
          <li>Sempre use o <strong>número no link</strong>, nunca no corpo da mensagem</li>
        </ul>
        <p><strong>Boas práticas:</strong></p>
        <ul>
          <li>Use um template claro e profissional</li>
          <li>Confirme que o telefone é do responsável atual</li>
          <li>Nunca reutilize números de clientes antigos</li>
          <li>Registre o envio no status do agendamento</li>
        </ul>
        <p><strong>⚠️ Importante:</strong> O telefone nunca deve aparecer no corpo da mensagem, apenas no link do WhatsApp.</p>`
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
