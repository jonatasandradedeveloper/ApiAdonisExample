# Análise Hub e fluxo — Pague Menos

Documento de alinhamento interno sobre o **Hub PBM**: quem chama quem entre canais, Hub e autorizadores.

Construído **em conjunto** pelo time Pague Menos (Digital, PBM e jornada Comercial) e pela Accenture / Avanade.

| | |
|---|---|
| Uso | Interno — alinhamento de produto, arquitetura e jornadas |
| Data | Setembro 2026 |
| Elaboração | Accenture / Avanade, em conjunto com o time Pague Menos |
| Objetivo | Ter uma referência única de como o Hub PBM se relaciona com canais e autorizadores |
| PDF para compartilhar | `docs/analise-hub-fluxo-pague-menos.pdf` |

### Envolvidos

| Nome | Empresa | E-mail |
|---|---|---|
| Danilo R. Bernardo | Avanade | danilo.r.bernardo@avanade.com |
| Jonatas A. Andrade da Silva | Avanade | j.a.andrade.da.silva@avanade.com |
| Pedro Luis Celotto | Avanade | pedro.luis.celotto@avanade.com |
| Mariana V. B. Pinheiro | Accenture | mariana.v.b.pinheiro@accenture.com |

## Como este documento foi construído

Este material não inventa arquitetura. Ele consolida, em linguagem comum, o que o time já apresentou nas sessões de knowledge transfer e discovery:

- **PM — Organização KT PM**, com a visão de Victor sobre digital, Vitrax, Hub de Integrações e jornadas
- **Travessia**, com o diagnóstico da jornada de compra e os 4 atos da autorização PBM
- **Discovery PBM** (visão de negócio e jornada), com a explicação da Edicleide sobre elegibilidade, CPF, regras e experiência
- **Discovery PBM** (onboarding técnico Accenture), com arquitetura do Hub, autorizadores, repositórios e monitoramento

A consolidação foi feita em conjunto com o time para que produto, design, engenharia e operação usem o mesmo entendimento: **o canal pede, o Hub orquestra, o autorizador decide**.

Se algum ponto divergir do que foi dito nas sessões, o ajuste deve ser feito neste documento, com o time.

---

## Resposta direta

O Hub chama as APIs dos autorizadores. App e site **não** falam com Interplayers, Funcional ou ePharma. Eles falam só com o Hub.

A “autorização” do PBM **não** é um token de API para o canal usar depois. É uma **autorização de negócio**: o autorizador gera um código/transação de desconto. Sem essa autorização, o desconto de laboratório não entra na compra.

| Pergunta | Resposta |
|---|---|
| O Hub chama as APIs dos autorizadores? | **Sim.** Essa é a função central dele. |
| Ele só pede autorização passando o token do autorizador? | **Não.** Ele faz cadastro, elegibilidade, autorização, reautorização e efetivação. A “autorização” é o código de desconto, não um token OAuth para o canal. |
| Com essa autorização, o app/site chama as APIs direto? | **Não.** App e site continuam chamando só o Hub. No PDV, a efetivação final também passa pelo ecossistema interno até o autorizador, não pelo app. |

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

O **Hub PBM** é a API central. Os canais (app, site, Painel de Vendas / PDV) **não** falam com os autorizadores. Eles falam só com o Hub.

### Responsabilidades do Hub PBM

Descritas na reunião técnica:

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
- Também citados no contexto de negócio: WhatsApp e lojas físicas

### Responsabilidades dos autorizadores

Do outro lado, os autorizadores:

- recebem as solicitações de elegibilidade
- processam autorizações
- mantêm os programas da indústria
- definem regras operacionais
- controlam limites, saldo e cadastro do CPF
- verificam o CPF
- consultam cadastro no programa
- retornam regras e preços
- geram autorizações
- retornam erros ou negativas
- definem determinados campos obrigatórios do cadastro

Autorizadores ativos citados no Discovery técnico: **Interplayers**, **Funcional** e **ePharma**. Quarto autorizador em integração: **IQ**.

Na Travessia aparecem nomes parcialmente distintos (Funcional, Interface, Farm, Equipe), provavelmente por reconhecimento de fala. No Discovery de negócio, o Portal da Drogaria foi citado como denominação oficial de um dos players.

Laboratório pode trocar de autorizador. Por isso o Hub precisa absorver essa troca, e os canais **não podem depender da API de cada um**.

Uma mesma campanha não deve estar simultaneamente em autorizadores diferentes, evitando sobreposição de condições para o mesmo medicamento.

Interplayers foi citado como o autorizador mais estável. Funcional e ePharma apresentam oscilações mais frequentes.

---

## O que o app/site realmente faz

O canal **pede** as operações ao Hub, passando CPF, produto, loja, dados de cadastro etc. O Hub decide **qual autorizador chamar**, chama a API dele, aplica regras internas da Pague Menos e devolve o resultado para a tela.

Ou seja: o app **não** “ganha um token do autorizador e passa a chamar a API dele”. Ele continua falando só com o Hub em todas as etapas.

### Fluxo da jornada digital

1. Cliente entra na PDP.
2. Informa o CPF (no app logado, o CPF já pode vir preenchido).
3. O **Hub** autentica no autorizador, verifica credenciamento da loja e elegibilidade do CPF.
4. Se elegível, o cliente vê as regras retornadas, escolhe uma e **solicita autorização**.
5. Se o programa exigir, o Hub pede receita, CRM, termos etc.
6. No checkout, com o CNPJ da loja de faturamento, o Hub faz **nova autorização** (reautorização).
7. O pedido é concluído.
8. Na loja, o PDV faz a **autorização final** junto ao autorizador (na Travessia isso aparece como o 4º ato, órgão regulador / BC Pharma).

A autorização é etapa obrigatória. Sem ativação do programa e autorização correspondente, o desconto de laboratório não é aplicado.

### Se o CPF não está cadastrado

1. O Hub identifica a ausência.
2. O canal mostra o formulário.
3. O cadastro **é enviado pelo Hub ao autorizador**.
4. A elegibilidade roda de novo.
5. O fluxo segue para autorização.

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

## Os 4 atos da autorização (Travessia)

Não são 4 chamadas do app ao autorizador. São 4 momentos em que **o Hub (e depois o PDV)** conversa com o autorizador.

| Ato | Onde | O que acontece |
|---|---|---|
| 1. Identificação / cadastro | PDP | Hub consulta o CPF no autorizador; se não existir, cadastra |
| 2. Primeira autorização | PDP | Hub pede a autorização do desconto para aquele CPF + SKU |
| 3. Reautorização | Checkout | Hub autoriza de novo com o CNPJ da loja que vai faturar |
| 4. Autorização final | PDV / loja | A venda é efetivada no autorizador (órgão regulador / BC Pharma) |

Por isso a Travessia priorizou a **refatoração do fluxo de primeira autorização**: é o maior esforço, e é o Hub quem orquestra isso, não o app isolado.

Junto com essa refatoração, o backlog PBM para Black Friday também priorizou:

- reformulação do formulário dinâmico (back-end + UX)
- sanitização de back-end
- sanitização de UX

---

## Por que o Hub existe (e não o canal direto)

1. **Um canal, vários autorizadores.** App/site não precisam conhecer contrato, autenticação e particularidades de cada um.
2. **Motor interno de regras.** A Pague Menos não aplica automaticamente tudo o que a indústria oferece. Há cadastro próprio, aprovação e governança (margem, taxa do autorizador, custo operacional). O Hub usa as regras internas **e** o retorno do autorizador.
3. **PBM não acumula com outras promoções.** Essa decisão comercial fica na orquestração do Hub/canais, não no autorizador. Fontes de aporte diferentes; acúmulo compromete margem e conciliação. Ao ativar PBM, a promoção anterior precisa ser removida.
4. **Observabilidade.** DataDog mede latência, sucesso e falha **por autorizador**, e tenta separar falha do Hub vs. falha do terceiro. Interplayers foi citado como o mais estável; Funcional e ePharma oscilam mais.
5. **Omnicanal.** A mesma autorização precisa servir app, site, WhatsApp, loja e Painel de Vendas.
6. **Troca de autorizador.** Laboratório pode migrar; o Hub absorve a mudança sem reescrever cada canal.

### Regras internas da Pague Menos

A companhia **não depende exclusivamente** das regras dos autorizadores. Mantém:

- cadastro próprio de regras
- processo próprio de aprovação
- governança própria

Nem todo desconto da indústria é vantajoso, considerando margem, custos operacionais e taxas dos autorizadores. As regras aprovadas são armazenadas internamente e usadas pelos canais digitais.

O Hub, portanto, combina:

1. o retorno do autorizador (elegibilidade, limite, preço, autorização)
2. as regras comerciais internas da Pague Menos

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

## Dois “Hubs” nas reuniões (não misturar)

**Hub de Integrações** (Victor, KT PM): camada larga que liga VTEX, Cosmos, sistemas internos e parceiros. Cada jornada é dona de um pedaço. **Comercial** é dona das integrações de PBM.

**Hub PBM** (Discovery técnico): a API específica do benefício. É o pedaço do Hub (jornada Comercial) que de fato chama os autorizadores.

Vitrax, no desenho do Victor, também aparece com autenticação, catálogo, carrinho, integrações e PBM. Na prática do Discovery PBM, a conversa com autorizador foi atribuída ao **Hub PBM**, não ao app/site.

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

Este alinhamento foi construído em conjunto com o time. A versão para compartilhar internamente é o PDF `docs/analise-hub-fluxo-pague-menos.pdf`.

Elaboração: Danilo R. Bernardo, Jonatas A. Andrade da Silva, Pedro Luis Celotto (Avanade) e Mariana V. B. Pinheiro (Accenture).
