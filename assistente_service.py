# ============================================================
# ASSISTENTE DE VISTORIA - SERVIÇO PYTHON
# ============================================================

import re
from typing import Dict, Tuple

class AssistenteService:
    """Serviço de assistência com respostas baseadas em palavras-chave"""

    # Mapa de palavras-chave para respostas
    RESPOSTAS = {
        # Nova Vistoria
        "nova-vistoria": {
            "titulo": "📝 Nova Vistoria",
            "conteudo": """<p><strong>Para criar uma vistoria, siga os passos:</strong></p>
<ul>
  <li>Preencha <strong>cliente/unidade do imóvel</strong> corretamente</li>
  <li>Confirme o <strong>endereço completo</strong> (rua, número, bairro, cidade, UF)</li>
  <li>Adicione <strong>responsável</strong> e <strong>telefone</strong> de contato</li>
  <li>Defina <strong>data e horário</strong> da vistoria</li>
  <li>Tire <strong>fotos</strong> e adicione observações</li>
  <li>Antes de salvar, confira se <strong>todos os dados pertencem ao imóvel correto</strong></li>
</ul>
<p><strong>⚠️ Dica importante:</strong> Evite copiar dados da vistoria anterior. Sempre confirme manualmente que os dados são do cliente atual.</p>"""
        },

        # Agendamentos
        "agendamentos": {
            "titulo": "📅 Agendamentos",
            "conteudo": """<p><strong>Antes de confirmar um agendamento:</strong></p>
<ul>
  <li>Confira <strong>data e horário</strong> com o cliente</li>
  <li>Valide o <strong>nome e telefone</strong> do responsável</li>
  <li>Confirme o <strong>endereço completo</strong></li>
  <li>Verifique o <strong>código do imóvel</strong> e tipo</li>
  <li>Defina o <strong>status</strong> corretamente</li>
</ul>
<p><strong>⚠️ Ao enviar pelo WhatsApp:</strong> Confira se o <strong>número é do cliente atual</strong>. Nunca reutilize contatos de agendamentos anteriores sem confirmar.</p>"""
        },

        # Campos Obrigatórios
        "campos-obrigatorios": {
            "titulo": "✅ Campos Obrigatórios",
            "conteudo": """<p><strong>Em Nova Vistoria - TODOS são obrigatórios:</strong></p>
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
<p><strong>⚠️ Sem telefone:</strong> O envio pelo WhatsApp deve ser bloqueado.</p>"""
        },

        # Revisar Antes de Salvar
        "conferir": {
            "titulo": "🔍 Revisar Antes de Salvar",
            "conteudo": """<p><strong>Checklist final - Revise tudo:</strong></p>
<ul>
  <li>☐ <strong>Fotos anexadas</strong> corretamente</li>
  <li>☐ <strong>Observações claras</strong> e legíveis</li>
  <li>☐ <strong>Endereço correto</strong> e completo</li>
  <li>☐ <strong>Responsável correto</strong> e nomes sem erro</li>
  <li>☐ <strong>Telefone atualizado</strong> do cliente</li>
  <li>☐ <strong>Status definido</strong> corretamente</li>
  <li>☐ <strong>Dados do cliente atual</strong> - não anterior</li>
</ul>
<p><strong>⚠️ Cuidado:</strong> Evite salvar usando dados do atendimento anterior. Sempre confirme que as informações estão atualizadas.</p>"""
        },

        # WhatsApp
        "whatsapp": {
            "titulo": "📲 Mensagem WhatsApp",
            "conteudo": """<p><strong>Antes de enviar pelo WhatsApp:</strong></p>
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
<p><strong>⚠️ Importante:</strong> O telefone nunca deve aparecer no corpo da mensagem, apenas no link do WhatsApp.</p>"""
        },

        # Telefone
        "telefone": {
            "titulo": "☎️ Telefone do Cliente",
            "conteudo": """<p><strong>Sobre o telefone do cliente:</strong></p>
<ul>
  <li>Sempre <strong>confirme o número atual</strong> com o cliente</li>
  <li>Use formato com <strong>DDD (ex: 11 99999-9999)</strong></li>
  <li>Nunca reutilize números de agendamentos anteriores</li>
  <li>Se estiver errado, o cliente <strong>não receberá a mensagem</strong></li>
  <li>Se detectar número antigo, <strong>atualize imediatamente</strong></li>
</ul>
<p><strong>⚠️ Telefone errado = agendamento perdido!</strong> Confirme sempre antes de enviar.</p>"""
        },

        # Fotos
        "fotos": {
            "titulo": "📷 Fotos da Vistoria",
            "conteudo": """<p><strong>Boas práticas para fotos:</strong></p>
<ul>
  <li>Tire fotos do <strong>imóvel completo</strong> (fachada, entrada)</li>
  <li>Registre <strong>ambientes principais</strong> (sala, quarto, cozinha)</li>
  <li>Capture <strong>detalhes importantes</strong> (danos, problemas)</li>
  <li>Certifique-se que as fotos estejam <strong>claras e bem iluminadas</strong></li>
  <li><strong>Inclua no campo de observações</strong> referências das fotos</li>
</ul>
<p><strong>Dica:</strong> Fotos claras e bem organizadas <strong>ajudam no relatório</strong> e aumentam a qualidade da vistoria.</p>"""
        },

        # Endereço
        "endereco": {
            "titulo": "📍 Endereço Completo",
            "conteudo": """<p><strong>Para preencher o endereço corretamente:</strong></p>
<ul>
  <li><strong>CEP:</strong> Use 8 dígitos (ex: 01310-100)</li>
  <li><strong>Rua/Avenida:</strong> Digite o nome completo</li>
  <li><strong>Número:</strong> Apartamento, sala, casa, etc</li>
  <li><strong>Complemento:</strong> Apto 302, Bloco A, Conjunto 4 (opcional)</li>
  <li><strong>Bairro:</strong> Nome do bairro</li>
  <li><strong>Cidade e UF:</strong> Cidade e estado (ex: São Paulo, SP)</li>
</ul>
<p><strong>✓ Após preenchidos, clique no botão "Carregar Endereço"</strong> para validar os dados.</p>"""
        },

        # Responsável
        "responsavel": {
            "titulo": "👤 Responsável pelo Aceite",
            "conteudo": """<p><strong>Dados do responsável:</strong></p>
<ul>
  <li><strong>Nome completo:</strong> Dessa pessoa que acompanhou a vistoria</li>
  <li><strong>Documento (opcional):</strong> CPF ou RG para referência</li>
  <li><strong>Confirmação:</strong> Marque o checkbox declarando que acompanhou</li>
</ul>
<p><strong>Recomendações:</strong></p>
<ul>
  <li>Sempre peça para o cliente <strong>conferir os dados</strong> antes de assinar</li>
  <li>Inclua <strong>observações importantes</strong> no campo de notas</li>
  <li>Certifique-se de que o nome está <strong>correto e sem erros de digitação</strong></li>
</ul>
<p><strong>⚠️ Se o cliente não estiver presente:</strong> Use "Não acompanhou" e registre quem estava.</p>"""
        },

        # Status
        "status": {
            "titulo": "🏷️ Status do Agendamento",
            "conteudo": """<p><strong>Significado de cada status:</strong></p>
<ul>
  <li><strong>Aguardando envio:</strong> Dados preenchidos, falta enviar WhatsApp</li>
  <li><strong>Mensagem enviada:</strong> WhatsApp enviado, aguardando confirmação</li>
  <li><strong>Confirmado:</strong> Cliente confirmou a vistoria</li>
  <li><strong>Vistoria iniciada:</strong> Você começou o processo de vistoria</li>
  <li><strong>Reagendar:</strong> Cliente pediu para mudar data/hora</li>
  <li><strong>Cancelado:</strong> Cliente cancelou a vistoria</li>
  <li><strong>Finalizado:</strong> Vistoria concluída e salva</li>
</ul>
<p><strong>Dica:</strong> Atualize o status conforme a vistoria avança.</p>"""
        },

        # Ajuda Geral
        "ajuda": {
            "titulo": "ℹ️ Como Usar o Assistente",
            "conteudo": """<p><strong>O assistente de vistoria pode ajudar com:</strong></p>
<ul>
  <li>📝 Dúvidas sobre <strong>Nova Vistoria</strong></li>
  <li>📅 Perguntas sobre <strong>Agendamentos</strong></li>
  <li>✅ Lista de <strong>Campos Obrigatórios</strong></li>
  <li>🔍 Dicas para <strong>Revisar Antes de Salvar</strong></li>
  <li>📲 Orientações sobre <strong>WhatsApp</strong></li>
  <li>☎️ Dúvidas sobre <strong>Telefone</strong></li>
  <li>📷 Boas práticas com <strong>Fotos</strong></li>
  <li>📍 Como preencher <strong>Endereço</strong></li>
  <li>👤 Sobre o <strong>Responsável</strong></li>
  <li>🏷️ O que significa cada <strong>Status</strong></li>
</ul>
<p><strong>💡 Dica:</strong> Digite uma palavra-chave ou clique nos botões rápidos abaixo!</p>"""
        }
    }

    def processar_mensagem(self, mensagem: str) -> Dict[str, str]:
        """
        Processa uma mensagem de usuário e retorna uma resposta.
        
        Args:
            mensagem (str): Mensagem do usuário
            
        Returns:
            Dict com 'titulo' e 'conteudo' da resposta
        """
        try:
            # Limpar a mensagem
            mensagem_limpa = mensagem.strip().lower()

            if not mensagem_limpa:
                return self._resposta_generica()

            # Palavras-chave com padrões de busca
            palavras_chave = {
                "nova-vistoria": ["nova vistoria", "criar vistoria", "preencher vistoria", "como criar", "primeiro passo"],
                "agendamentos": ["agendamento", "agendar", "agenda", "datas", "horário"],
                "campos-obrigatorios": ["campo obrigatorio", "campo obrigatório", "campos", "o que precisa", "o que é necessário", "preciso preencher", "quais campos"],
                "conferir": ["revisar", "conferir", "antes de salvar", "checklist", "final", "verificar", "revisar antes"],
                "whatsapp": ["whatsapp", "mensagem whatsapp", "enviar mensagem", "enviar whatsapp", "link whatsapp"],
                "telefone": ["telefone", "telefone do cliente", "número", "celular", "contato", "ddd", "telefone errado", "número anterior"],
                "fotos": ["foto", "fotos", "fotografia", "imagem", "capturar", "tirar foto"],
                "endereco": ["endereço", "endereco", "cep", "rua", "avenida", "bairro", "localização", "local"],
                "responsavel": ["responsável", "responsavel", "responsavel pelo aceite", "nome da pessoa", "quem assinou"],
                "status": ["status", "estado", "situação", "qual status", "qual é o status"],
                "ajuda": ["ajuda", "help", "como funciona", "o que voce faz", "qual sua funcao", "como usar"]
            }

            # Procurar por palavras-chave
            for chave, palavras in palavras_chave.items():
                for palavra in palavras:
                    if palavra in mensagem_limpa:
                        resposta = self.RESPOSTAS.get(chave)
                        if resposta:
                            return resposta

            # Se nenhuma palavra-chave encontrada
            return self._resposta_nao_entendeu()

        except Exception as e:
            print(f"[Assistente] Erro ao processar mensagem: {e}")
            return self._resposta_erro()

    def _resposta_generica(self) -> Dict[str, str]:
        """Resposta genérica para mensagens vazias"""
        return self.RESPOSTAS.get("ajuda", {
            "titulo": "ℹ️ Assistente",
            "conteudo": "<p>Olá! Como posso ajudar? Digite uma dúvida ou use os botões rápidos.</p>"
        })

    def _resposta_nao_entendeu(self) -> Dict[str, str]:
        """Resposta quando não entende a mensagem"""
        return {
            "titulo": "🤔 Não entendi",
            "conteudo": """<p>Não entendi totalmente sua pergunta.</p>
<p><strong>Posso ajudar com:</strong></p>
<ul>
  <li>📝 Nova vistoria</li>
  <li>📅 Agendamentos</li>
  <li>✅ Campos obrigatórios</li>
  <li>🔍 Revisão antes de salvar</li>
  <li>📲 Mensagem WhatsApp</li>
  <li>☎️ Telefone</li>
  <li>📷 Fotos</li>
  <li>📍 Endereço</li>
  <li>👤 Responsável</li>
  <li>🏷️ Status</li>
</ul>
<p><strong>Tente descrever o que você gostaria de saber!</strong></p>"""
        }

    def _resposta_erro(self) -> Dict[str, str]:
        """Resposta em caso de erro"""
        return {
            "titulo": "⚠️ Erro",
            "conteudo": "<p>Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.</p>"
        }
