// ============================================================
// ASSISTENTE DE VISTORIA COM CHAT
// ============================================================

(function () {
  try {
    // Elementos do DOM
    const assistantBtn = document.querySelector("#assistant-btn");
    const assistantModal = document.querySelector("#assistant-modal");
    const assistantCloseBtn = document.querySelector("#assistant-close-btn");
    const assistantBackBtn = document.querySelector("#assistant-back-btn");
    const assistantContent = document.querySelector("#assistant-content");
    const assistantResponse = document.querySelector("#assistant-response");
    const assistantResponseText = document.querySelector("#assistant-response-text");
    const assistantInput = document.querySelector("#assistant-input");
    const assistantSendBtn = document.querySelector("#assistant-send-btn");
    const assistantChatHistory = document.querySelector("#assistant-chat-history");
    const quickBtns = document.querySelectorAll(".assistant-quick-btn");

    // Configuração
    let isLoading = false;

    // Base de Conhecimento - Respostas Locais (100% Front-end)
    const baseConhecimento = {
      "nova-vistoria": {
        titulo: "📝 Nova Vistoria",
        conteudo: `<p><strong>Para criar uma vistoria, siga os passos:</strong></p>
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
        titulo: "📅 Agendamentos",
        conteudo: `<p><strong>Antes de confirmar um agendamento:</strong></p>
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
        titulo: "✅ Campos Obrigatórios",
        conteudo: `<p><strong>Em Nova Vistoria - TODOS são obrigatórios:</strong></p>
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
      "revisar": {
        titulo: "🔍 Revisar Antes de Salvar",
        conteudo: `<p><strong>Checklist final - Revise tudo:</strong></p>
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
        titulo: "📲 Mensagem WhatsApp",
        conteudo: `<p><strong>Antes de enviar pelo WhatsApp:</strong></p>
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
      },
      "telefone": {
        titulo: "☎️ Telefone para Contato",
        conteudo: `<p><strong>Ao registrar o telefone:</strong></p>
        <ul>
          <li>Use formato com <strong>DDD + número</strong> (ex: (11) 98765-4321)</li>
          <li>Sempre do <strong>responsável atual</strong>, nunca de cliente anterior</li>
          <li>Valide o <strong>número com o cliente</strong> antes de salvar</li>
          <li>Use apenas este telefone para <strong>contato direto</strong></li>
        </ul>
        <p><strong>Para WhatsApp:</strong></p>
        <ul>
          <li>Confirme que o número tem <strong>WhatsApp ativo</strong></li>
          <li>Use o <strong>link de contato</strong> disponível no sistema</li>
          <li>Nunca iniba o número no corpo da mensagem</li>
        </ul>
        <p><strong>⚠️ Cuidado:</strong> Um telefone errado pode impossibilitar o contato. Valide sempre!</p>`
      },
      "fotos": {
        titulo: "📷 Fotos e Evidências",
        conteudo: `<p><strong>Boas práticas ao adicionar fotos:</strong></p>
        <ul>
          <li>Tire <strong>fotos claras</strong> em boa iluminação</li>
          <li>Capture <strong>diferentes ângulos</strong> do imóvel/dano</li>
          <li>Inclua <strong>detalhes importantes</strong> (janelas, portas, paredes)</li>
          <li>Adicione <strong>foto geral</strong> e depois detalhes</li>
          <li>Use <strong>nome descritivo</strong> para a foto (ex: fachada-frontal.jpg)</li>
        </ul>
        <p><strong>Tipos de foto recomendados:</strong></p>
        <ul>
          <li>Fachada frontal do imóvel</li>
          <li>Áreas com problemas/danos</li>
          <li>Documentação (placas, endereços)</li>
          <li>Visão geral do interior</li>
        </ul>
        <p><strong>⚠️ Qualidade:</strong> Fotos sem foco ou muito escuras prejudicam a análise. Sempre revise antes de salvar!</p>`
      },
      "endereco": {
        titulo: "🏠 Endereço Completo",
        conteudo: `<p>Preencha o endereço completo em um único campo.</p>
        <p>Inclua rua ou avenida, número, complemento quando houver, bairro, cidade e UF.</p>
        <p><strong>Exemplo correto:</strong><br/>
        Rua das Flores, 123, Apto 405 - Centro - São Paulo - SP</p>
        <p><strong>⚠️ Importante:</strong> Um endereço incompleto pode gerar confusão. Sempre confirme com o cliente!</p>`
      },
      "responsavel": {
        titulo: "👤 Responsável da Vistoria",
        conteudo: `<p><strong>Ao registrar o responsável:</strong></p>
        <ul>
          <li><strong>Nome completo</strong> da pessoa de contato</li>
          <li>Deve ser <strong>residente ou autorizado</strong> a receber a vistoria</li>
          <li><strong>Valide o nome</strong> diretamente com o cliente</li>
          <li>Registre <strong>telefone de contato</strong> direto da pessoa</li>
          <li>Confirme <strong>disponibilidade</strong> para a data/horário da vistoria</li>
        </ul>
        <p><strong>Dicas:</strong></p>
        <ul>
          <li>Se o responsável mudar, <strong>sempre atualizar</strong> antes da vistoria</li>
          <li>Corfira se tem <strong>chave de acesso</strong> ao imóvel</li>
          <li>Registre também um <strong>responsável alternativo</strong> se possível</li>
        </ul>
        <p><strong>⚠️ Não use nomes de vistorias anteriores!</strong> Sempre confirme que é o responsável ATUAL.</p>`
      },
      "status": {
        titulo: "📊 Status da Vistoria",
        conteudo: `<p><strong>Possíveis status:</strong></p>
        <ul>
          <li><strong>Agendada:</strong> Vistoria já marcada, aguardando data</li>
          <li><strong>Realizada:</strong> Vistoria concluída com sucesso</li>
          <li><strong>Cancelada:</strong> Cliente pediu para cancelar</li>
          <li><strong>Adiada:</strong> Remarcada para outra data</li>
          <li><strong>Pendente:</strong> Aguardando informações do cliente</li>
          <li><strong>Em Andamento:</strong> Vistoria iniciada</li>
        </ul>
        <p><strong>Quando mudar o status:</strong></p>
        <ul>
          <li>✅ Confirme sempre com o cliente antes</li>
          <li>✅ Atualize imediatamente após conclusão</li>
          <li>✅ Adicione observações sobre motivo de mudança</li>
          <li>✅ Se cancelar, sempre anote o motivo</li>
        </ul>
        <p><strong>⚠️ Status errado pode atrasar o processo!</strong> Sempre revise antes de salvar.</p>`
      },
      "ajuda": {
        titulo: "❓ Como Usar o Assistente",
        conteudo: `<p><strong>Este assistente ajuda com dúvidas sobre:</strong></p>
        <ul>
          <li>📝 Como criar uma vistoria</li>
          <li>📅 Como agendar vistorias</li>
          <li>✅ Campos obrigatórios e regras</li>
          <li>🔍 Como revisar antes de salvar</li>
          <li>📲 Como enviar pelo WhatsApp</li>
          <li>☎️ Como registrar telefone de contato</li>
          <li>📷 Como anexar fotos</li>
          <li>🏠 Como preencher endereço</li>
          <li>👤 Como registrar responsável</li>
          <li>📊 Como definir status</li>
        </ul>
        <p><strong>Para obter resposta:</strong></p>
        <ul>
          <li>Clique nos <strong>botões rápidos</strong> abaixo</li>
          <li>Ou <strong>digite sua dúvida</strong> no campo de texto</li>
          <li>O assistente buscará a resposta mais relevante</li>
        </ul>
        <p><strong>💡 Dica:</strong> Use palavras-chave como "telefone", "foto", "endereço" para encontrar respostas rápidas!</p>`
      }
    };

    // ============================================================
    // FUNÇÕES PRINCIPAIS
    // ============================================================

    function openModal() {
      assistantModal.classList.remove("hidden");
      assistantBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      assistantInput.focus();
    }

    function closeModal() {
      assistantModal.classList.add("hidden");
      assistantBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      resetContent();
      assistantBtn.focus();
    }

    function resetContent() {
      assistantContent.classList.remove("hidden");
      assistantResponse.classList.add("hidden");
      assistantResponseText.innerHTML = "";
    }

    function showResponse(titulo, conteudo) {
      assistantContent.classList.add("hidden");
      assistantResponse.classList.remove("hidden");
      assistantResponseText.innerHTML = `<h4>${titulo}</h4>${conteudo}`;
    }

    // ============================================================
    // FUNÇÕES DE CHAT
    // ============================================================

    function adicionarMensagem(texto, tipo = "user") {
      const mensagem = document.createElement("div");
      mensagem.className = `assistant-message ${tipo}`;
      mensagem.innerHTML = `<span class="message-text">${escapeHtml(texto)}</span>`;
      assistantChatHistory.appendChild(mensagem);
      assistantChatHistory.scrollTop = assistantChatHistory.scrollHeight;
    }

    // Renderiza somente o HTML confiável da base interna. Mensagens digitadas
    // pelo usuário continuam passando por escape em adicionarMensagem().
    function adicionarRespostaAssistente(resposta) {
      const mensagem = document.createElement("div");
      mensagem.className = "assistant-message assistant";
      const corpo = document.createElement("div");
      corpo.className = "message-text assistant-answer";
      corpo.innerHTML = `<h4>${escapeHtml(resposta.titulo || "Assistente")}</h4>${resposta.conteudo || ""}`;
      mensagem.appendChild(corpo);
      assistantChatHistory.appendChild(mensagem);
      assistantChatHistory.scrollTop = assistantChatHistory.scrollHeight;
    }

    function mostrarLoading() {
      const loading = document.createElement("div");
      loading.className = "assistant-message assistant assistant-loading-msg";
      loading.innerHTML = `<div class="message-text assistant-loading">
        <span></span><span></span><span></span>
      </div>`;
      assistantChatHistory.appendChild(loading);
      assistantChatHistory.scrollTop = assistantChatHistory.scrollHeight;
      return loading;
    }

    function escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }

    function buscarResposta(mensagem) {
      /**
       * Busca a melhor resposta usando palavras-chave
       * 100% FRONT-END - Sem dependência de backend
       */
      const msgLower = mensagem.toLowerCase().trim();
      
      // Mapa de palavras-chave para categoria
      const palavrasChave = {
        "nova-vistoria": ["nova vistoria", "criar vistoria", "fazer vistoria", "vistoria nova", "vistoria"],
        "agendamentos": ["agendamento", "agendar", "marcar", "data horário", "schedular"],
        "campos-obrigatorios": ["campos obrigatório", "campo obrigatório", "obrigatório", "campos", "preenchimento"],
        "revisar": ["revisar", "conferir", "revisar antes", "verificar antes", "checar"],
        "whatsapp": ["whatsapp", "wpp", "mensagem", "enviar mensagem"],
        "telefone": ["telefone", "telefo", "contato", "número", "ddd"],
        "fotos": ["foto", "imagem", "evidência", "anexar", "picture"],
        "endereco": ["endereço", "rua", "avenida", "local", "apto", "apartamento", "bairro"],
        "responsavel": ["responsável", "responsavel", "contato", "pessoa", "nome"],
        "status": ["status", "situação", "estado", "andamento"],
        "ajuda": ["ajuda", "help", "dúvida", "duvida", "como", "qual", "que"]
      };

      // Buscar a categoria mais relevante
      for (const [categoria, palavras] of Object.entries(palavrasChave)) {
        for (const palavra of palavras) {
          if (msgLower.includes(palavra)) {
            return baseConhecimento[categoria] || respostaGenericaNaoEntendeu();
          }
        }
      }

      // Se não encontrou nada, retornar ajuda geral
      return respostaGenericaNaoEntendeu();
    }

    function respostaGenericaNaoEntendeu() {
      return {
        titulo: "❓ Não entendi",
        conteudo: `<p>Desculpe, não encontrei uma resposta específica para sua dúvida.</p>
        <p><strong>Tente:</strong></p>
        <ul>
          <li>Usar os <strong>botões rápidos</strong> abaixo para perguntas comuns</li>
          <li>Usar palavras-chave como: vistoria, agendamento, telefone, fotos, endereço, etc.</li>
          <li>Digitar sua dúvida de forma mais simples</li>
        </ul>
        <p>Se tiver dúvidas não listadas, consulte um supervisor ou clique no botão "❓ Ajuda".</p>`
      };
    }

    async function enviarMensagem() {
      /**
       * Processa mensagem do usuário localmente
       * 100% FRONT-END - Sem dependência de backend
       */
      const mensagem = assistantInput.value.trim();
      if (!mensagem || isLoading) return;

      // Adicionar mensagem do usuário
      adicionarMensagem(mensagem, "user");
      assistantInput.value = "";
      assistantSendBtn.disabled = true;
      isLoading = true;

      // Mostrar loading por um momento para melhor UX
      const loadingEl = mostrarLoading();

      try {
        // Simular delay mínimo (faz parecer mais responsivo)
        await new Promise(resolve => setTimeout(resolve, 300));

        // Buscar resposta localmente
        const resposta = buscarResposta(mensagem);

        // Remover loading
        loadingEl.remove();

        // Adicionar resposta do assistente
        if (resposta.conteudo) adicionarRespostaAssistente(resposta);
        else adicionarMensagem(resposta.titulo, "assistant");

      } catch (erro) {
        console.error("[Assistente] Erro:", erro);
        loadingEl.remove();
        adicionarMensagem("⚠️ Ocorreu um erro inesperado. Tente novamente.", "assistant");
      } finally {
        assistantSendBtn.disabled = false;
        isLoading = false;
        assistantInput.focus();
      }
    }

    // ============================================================
    // EVENT LISTENERS
    // ============================================================

    // Modal
    assistantBtn.addEventListener("click", openModal);
    assistantCloseBtn.addEventListener("click", closeModal);
    assistantBackBtn.addEventListener("click", resetContent);

    // Chat
    assistantInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviarMensagem();
      }
    });

    assistantSendBtn.addEventListener("click", enviarMensagem);

    // Botões rápidos
    quickBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        const resposta = baseConhecimento[action];
        if (resposta) {
          adicionarMensagem(btn.querySelector(".quick-btn-label").textContent, "user");
          adicionarRespostaAssistente(resposta);
        }
      });
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !assistantModal.classList.contains("hidden")) {
        closeModal();
      }
    });

    // Fechar ao clicar fora
    assistantModal.addEventListener("click", (e) => {
      if (e.target === assistantModal) {
        closeModal();
      }
    });

  } catch (erro) {
    console.error("[Assistente] Erro ao inicializar:", erro);
    // App continua funcionando mesmo se o assistente falhar
  }
})();
