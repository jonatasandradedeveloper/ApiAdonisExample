# Hub PBM — como funciona

Documento de alinhamento sobre o papel do **Hub PBM** na jornada de Programa de Benefícios de Medicamentos da Pague Menos.

Baseado exclusivamente nas reuniões:

- PM — Organização KT PM (Victor)
- Plano de digitalização / Travessia
- Discovery PBM (onboarding técnico Accenture)
- Discovery PBM (visão de negócio e jornada)

---

## Resposta direta

| Pergunta | Resposta |
|---|---|
| O Hub chama as APIs dos autorizadores? | **Sim.** Essa é a função central dele. |
| Ele só pede autorização passando o token do autorizador? | **Não.** Ele faz cadastro, elegibilidade, autorização, reautorização e efetivação. A “autorização” é o código de desconto, não um token OAuth para o canal. |
| Com essa autorização, o app/site chama as APIs direto? | **Não.** App e site continuam chamando só o Hub. No PDV, a efetivação final também passa pelo ecossistema interno até o autorizador. |

O canal pede. O Hub orquestra. O autorizador decide elegibilidade, limite e gera a autorização. O Hub devolve o resultado para a tela.

---

## Quem chama quem

```
App  ─┐
Site ─┼──►  Hub PBM  ──►  Autorizadores (Interplayers, Funcional, ePharma, IQ…)
PDV  ─┘         │
                ├── regras internas da Pague Menos
                └── canais digitais e físicos
```

O **Hub PBM** é a API central do ecossistema. Os canais (app, site, Painel de Vendas / PDV) **não** falam com os autorizadores. Eles falam só com o Hub.

A “autorização” do PBM **não** é um token de API para o canal usar depois. É uma **autorização de negócio**: o autorizador gera um código/transação de desconto. Sem essa autorização, o desconto de laboratório não entra na compra.

---

## Dois “Hubs” (não misturar)

Nas reuniões aparecem dois conceitos diferentes:

### Hub de Integrações

Camada larga apresentada pelo Victor (KT PM). Liga:

- VTEX
- Cosmos
- sistemas internos
- parceiros

Cada jornada é dona de um pedaço. A jornada **Comercial** é dona das integrações de PBM.

### Hub PBM

API específica do benefício, apresentada no Discovery técnico. É o pedaço do Hub (jornada Comercial) que de fato chama os autorizadores.

Vitrax, no desenho do Victor, também aparece com autenticação, catálogo, carrinho, integrações e PBM. Na prática do Discovery PBM, a conversa com autorizador foi atribuída ao **Hub PBM**, não ao app/site.

---

## O que o Hub PBM faz

Responsabilidades descritas na reunião técnica:

- centralizar regras de negócio
- integrar com autorizadores
- processar elegibilidade
- processar cadastro de beneficiário
- processar autorização e reautorização
- servir app, site e balcão (Painel de Vendas)

Tecnologias mencionadas: .NET, AWS, EKS, Azure DevOps, DataDog, VTEX.

Canais consumidores:

- Site Pague Menos
- Aplicativo
- Balcão, por meio do Painel de Vendas
- Também citado no contexto de negócio: WhatsApp e lojas físicas

---

## O que os autorizadores fazem

Autorizadores ativos citados no Discovery técnico:

- Interplayers
- Funcional
- ePharma

Quarto autorizador em integração: **IQ**.

Na Travessia aparecem nomes parcialmente distintos (Funcional, Interface, Farm, Equipe), provavelmente por reconhecimento de fala. No Discovery de negócio, o Portal da Drogaria foi citado como denominação oficial de um dos players.

O autorizador:

- recebe solicitações de elegibilidade
- processa autorizações
- mantém programas das indústrias farmacêuticas
- define regras operacionais dos programas
- verifica o CPF
- consulta cadastro no programa
- controla limites e saldo
- retorna regras e preços
- gera autorizações
- retorna erros ou negativas
- define determinados campos obrigatórios do cadastro

Laboratórios podem migrar de autorizador conforme interesse comercial. Por isso o Hub precisa absorver essa troca, e os canais não podem depender da API de cada um.

Uma mesma campanha não deve estar simultaneamente em autorizadores diferentes, evitando sobreposição de condições para o mesmo medicamento.

Interplayers foi citado como o autorizador mais estável. Funcional e ePharma apresentam oscilações mais frequentes.

---

## Jornada digital do cliente

1. **Acesso ao produto** — o cliente entra na PDP (site ou app).
2. **Identificação e elegibilidade** — informa o CPF. O Hub autentica no autorizador, verifica credenciamento da loja e elegibilidade do CPF.
3. **Seleção de regra** — se elegível, o cliente vê as regras retornadas, escolhe uma e solicita autorização.
4. **Informações complementares** — se o programa exigir: receita, CRM do médico, termos, dados extras.
5. **Checkout e reautorização** — o produto segue para o checkout, a loja de retirada é escolhida, e o Hub faz nova autorização com o CNPJ da loja que vai faturar.
6. **Conclusão** — o pedido é concluído.

A autorização é etapa obrigatória. Sem ativação do programa e autorização correspondente, o desconto de laboratório não é aplicado.

### Quando o cliente não tem cadastro

1. O Hub identifica a ausência de cadastro.
2. O canal carrega o formulário.
3. O cliente preenche.
4. O cadastro **é enviado pelo Hub ao autorizador**.
5. A elegibilidade é executada novamente.
6. O fluxo segue para autorização.

Há uma iniciativa para tornar o formulário do aplicativo **dinâmico**: exibir só os campos exigidos pelo autorizador para aquele SKU/programa.

### Pós-venda na loja

1. O pedido chega à loja.
2. A loja imprime uma pré-venda.
3. O operador carrega a venda no PDV.
4. O sistema executa a transação junto ao autorizador.
5. A venda é concluída.
6. As movimentações financeiras são registradas.

Em caso de erro, existem rotinas de cancelamento e suporte operacional.

---

## Os 4 atos da autorização

Não são 4 chamadas do app ao autorizador. São 4 momentos em que **o Hub (e depois o PDV)** conversa com o autorizador.

| Ato | Onde | O que acontece |
|---|---|---|
| 1. Identificação / cadastro | PDP | Hub consulta o CPF no autorizador; se não existir, cadastra |
| 2. Primeira autorização | PDP | Hub pede a autorização do desconto para aquele CPF + SKU |
| 3. Reautorização | Checkout | Hub autoriza de novo com o CNPJ da loja que vai faturar |
| 4. Autorização final | PDV / loja | A venda é efetivada no autorizador (órgão regulador / BC Pharma) |

A Travessia priorizou a **refatoração do fluxo de primeira autorização** como maior esforço do backlog PBM para Black Friday, junto com:

- reformulação do formulário dinâmico (back-end + UX)
- sanitização de back-end
- sanitização de UX

---

## Regras internas da Pague Menos

A companhia **não depende exclusivamente** das regras dos autorizadores. Mantém:

- cadastro próprio de regras
- processo próprio de aprovação
- governança própria

Nem todo desconto da indústria é vantajoso, considerando margem, custos operacionais e taxas dos autorizadores. As regras aprovadas são armazenadas internamente e usadas pelos canais digitais.

O Hub, portanto, combina:

1. o retorno do autorizador (elegibilidade, limite, preço, autorização)
2. as regras comerciais internas da Pague Menos

### PBM não acumula com outras promoções

Desconto de laboratório e promoção própria não devem coexistir na mesma compra. Fontes de aporte diferentes; acúmulo compromete margem e conciliação. Ao ativar PBM, a promoção anterior precisa ser removida.

---

## Elegibilidade e papel do CPF

O benefício é vinculado a um CPF válido. Antes de ativar o desconto, o fluxo verifica:

- se o CPF está cadastrado no programa
- se atende aos critérios da campanha
- se ainda existe saldo ou quantidade disponível
- se o limite mensal ou anual foi atingido
- se já usou condição de primeira compra
- se há pendências de cadastro ou aceite de termos

A regra efetivamente oferecida é a **retornada pelo autorizador para aquele CPF**. Preços exibidos na página não são garantia.

A condição de primeira compra considera o histórico do CPF **no programa**, não só na Pague Menos. Se o cliente já usou o benefício em outra rede, pode não estar mais elegível.

---

## Por que o Hub existe (e não o canal direto)

1. **Um canal, vários autorizadores.** App/site não precisam conhecer contrato, autenticação e particularidades de cada um.
2. **Motor interno de regras.** A Pague Menos filtra o que a indústria oferece antes de exibir e aplicar.
3. **PBM não acumula com outras promoções.** Essa decisão comercial fica na orquestração, não no autorizador.
4. **Observabilidade.** DataDog mede latência, sucesso e falha por autorizador, e tenta separar falha do Hub vs. falha do terceiro.
5. **Omnicanal.** A mesma autorização precisa servir app, site, WhatsApp, loja e Painel de Vendas.
6. **Troca de autorizador.** Laboratório pode migrar; o Hub absorve a mudança sem reescrever cada canal.

---

## Observabilidade e desafios técnicos

Monitoramento (DataDog):

- latência
- disponibilidade
- taxa de sucesso
- performance dos autorizadores
- receita impactada por falhas

Desafios citados:

- homologação dos autorizadores nem sempre confiável; em alguns casos testes usam partes de produção ou workspaces isolados
- falha de infraestrutura do autorizador impacta direto a experiência do cliente
- cache da VTEX já gerou reutilização indevida; mitigação com identificadores randômicos em chamadas específicas

---

## Stack e repositórios mencionados

| Camada | Ferramentas |
|---|---|
| Backend | Visual Studio, .NET |
| Front-end | VS Code, VTEX CLI |
| Mobile | Android Studio |
| Banco | SQL Server |
| DevOps | Azure DevOps, PR, GMUD |
| Monitoramento | DataDog |

Repositórios compartilhados no Discovery: Hub PBM, API do app, front-end do app, site Pague Menos, Painel de Vendas, site Extrafarma.

Fluxo de deploy: desenvolvimento → PR → revisões → testes → quality gates → aprovação arquitetural → GMUD → produção.

---

## Síntese

O Hub PBM é o intermediário obrigatório entre canais e autorizadores. Ele não “repassa um token” para o app chamar o autorizador. Ele executa cadastro, elegibilidade, autorização, reautorização e, no PDV, a efetivação da venda.

App e site nunca devem integrar direto com Interplayers, Funcional, ePharma ou IQ. Qualquer evolução de jornada (formulário dinâmico, mensagens de erro, primeira autorização, reautorização no checkout) passa pelo Hub.
