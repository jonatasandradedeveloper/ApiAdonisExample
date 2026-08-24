# Plano de negócio — MobiliAuto

Versão 1.0 · agosto de 2026  
Fonte: consolidação das decisões de produto nas conversas de junho a agosto de 2025.

---

## 1. Sumário executivo

O **MobiliAuto** é um marketplace de assistência automotiva sob demanda. Conecta motoristas em emergência a prestadores verificados — guincho, chaveiro, mecânico, borracheiro e motorista — com geolocalização, preço estimado, pagamento no app e rastreio em tempo real.

O mercado brasileiro de assistência é grande, recorrente e ainda informal: a maioria das pessoas resolve pane, chave trancada ou blitz por telefone, WhatsApp e indicação. Apps existentes (Cadê Guincho, Reboque.me, Helpie) resolvem sobretudo o guincho. O MobiliAuto compete no **combo** (vários serviços + motorista de resgate de blitz + motorista substituto) e na **experiência estilo Uber**.

**Hipótese de entrada:** lançar em **uma região metropolitana**, com operação híbrida (match automático + despacho assistido pelo admin), validando primeiro **guincho, chaveiro e mecânico**.

**Modelo:** comissão por serviço (10–25%) + planos (cliente e prestador) + B2B (frotas, oficinas, locadoras, seguradoras).

**O que se busca agora:** sócio desenvolvedor para construir o MVP e participar do equity. Não é um job de cliente; é construção de empresa.

---

## 2. Problema

Motoristas enfrentam imprevistos com alta urgência e baixa previsibilidade:

- pane mecânica ou elétrica
- pneu furado
- chave trancada, perdida ou quebrada
- pane seca
- veículo parado em blitz / retenção
- condutor impossibilitado de dirigir (álcool, cansaço, suspensão)

A jornada atual é ruim:

| Dor | Efeito |
| --- | ------ |
| Telefones aleatórios no Google | desconfiança e demora |
| Preço só depois do atendimento | abuso percebido |
| Sem rastreio | ansiedade e “sumiu o prestador” |
| Serviços fragmentados | um app de guincho, outro de chaveiro, outro de motorista |
| Call center de seguradora | lento, horário e cobertura limitados |
| Motorista de app / entregador | usa o carro como ferramenta e não pode ficar parado |

**Insight:** o usuário paga com baixa resistência quando está travado. O ticket é emocional, não só racional.

---

## 3. Solução e proposta de valor

> **MobiliAuto: assistência veicular 24h sob demanda. Rápido. Local. Sem burocracia.**

O app conecta três lados:

1. **Cliente** — solicita socorro, acompanha no mapa, paga e avalia.
2. **Prestador** — recebe chamado, aceita/recusa, navega, atualiza status, recebe.
3. **Admin (central)** — credencia a rede, ajusta preços, despacha manualmente quando o match automático falha, trata exceções.

### Slogan (candidatos)

- “Sua ajuda na estrada está a um toque.”
- “Se o motorista teve um problema com o carro, o MobiliAuto resolve.”
- “Na blitz, na estrada, no seu tempo.”

### O que o produto **não** faz (decisão explícita)

- Remoção hospitalar / traslado de vítimas
- Hospedagem e transporte por pane longe da cidade de origem

Esses itens saíram do escopo por complexidade regulatória e operacional.

---

## 4. Produto e catálogo de serviços

### 4.1 Serviços do catálogo

| Serviço | Quando usar | O que o app precisa |
| ------- | ----------- | ------------------- |
| **Guincho / reboque** | Pane grave, acidente, veículo sem condição de rodar | Tipo de veículo, origem, destino, tipo de plataforma, ETA, preço estimado |
| **Chaveiro automotivo** | Chave trancada, perdida, quebrada, falha no controle | Abertura no local; serviços complexos (chave codificada) por região |
| **Mecânico** | Pane leve no local (bateria, fusível, não liga) | Checklist do problema, orçamento rápido, reboque se não resolver |
| **Borracheiro** | Pneu furado, estepe, calibragem | Atendimento no local, ETA |
| **Motorista** | Blitz, álcool, cansaço, não deixar o carro no local | Dois modos: **resgate** (retirar da blitz/retenção) e **substituto** (levar o carro e o condutor) |

**Pane seca** (envio de combustível) fica como extensão do socorro mecânico na expansão — não entra no MVP.

### 4.2 Como o cliente pede

1. Abre o app (idealmente já logado, com veículo e documentos cadastrados).
2. Escolhe o serviço na home.
3. Informa **De** e **Para onde?** com autocomplete de endereço (sem botão “Buscar”: o clique na sugestão confirma).
4. Vê prestador, ETA e **preço estimado**.
5. Confirma, acompanha no mapa, paga, avalia.

### 4.3 Diferencial competitivo

Comparativo usado na validação de posicionamento:

| Capacidade | Cadê Guincho | Reboque.me | MobiliAuto |
| ---------- | ------------ | ---------- | ---------- |
| Acionar guincho | Sim | Sim | Sim |
| Rastreio em tempo real | Parcial | Sim | Sim (estilo Uber) |
| Motorista substituto | Não | Não | Sim |
| Motorista resgate (blitz) | Não | Não | Sim |
| Fluxo rápido de blitz + docs pré-cadastrados | Não | Não | Sim |
| Chaveiro + mecânico + borracheiro | Não / limitado | Limitado | Sim |
| Chat interno | Não | Não | Sim |
| Planos / cashback | Não | Não | Sim (pós-MVP) |
| Prestadores autônomos credenciados | Não | Não | Sim |

**Frase de posicionamento:** enquanto outros apps resolvem um problema, o MobiliAuto resolve o motorista.

### 4.4 Identidade visual (já definida)

| Token | Hex | Uso |
| ----- | --- | --- |
| Laranja-vermelho | `#FF5722` | Primária, CTAs, urgência |
| Azul escuro | `#263238` | Texto, ícones, sidebar admin |
| Amarelo | `#FFCA28` | Alertas, status |
| Cinza claro | `#ECEFF1` | Fundo de cards |
| Branco | `#FFFFFF` | Superfície, contraste |

Tipografia: **Inter** (Bold / SemiBold / Regular).  
Botões: altura 48px, radius 12px.  
Ícones: flat, preenchidos, mínimo 24px.

---

## 5. Mercado

### 5.1 Tamanho e contexto

- Dezenas de milhões de veículos leves no Brasil.
- Assistência 24h é commodity de seguro, mas **milhões de motoristas não têm seguro** ou têm cobertura limitada.
- Motoristas de app, entregadores, frotas e viajantes valorizam acionamento rápido.
- O consumidor já foi educado por Uber, 99 e iFood para marketplace geolocalizado.

### 5.2 Demanda relativa dos serviços (estimativa qualitativa)

Usada para priorizar o MVP, não como pesquisa primária.

| Serviço | Necessidade percebida | Ocorrência real | Papel no produto |
| ------- | --------------------- | --------------- | ---------------- |
| Guincho | Alta | Alta | Core de receita no dia 1 |
| Documentos / calendário veicular | Alta | Média | Retenção (pós-MVP) |
| Mecânico / bateria | Média-alta | Média | Complementa o guincho |
| Borracheiro | Média | Média | Complementa o guincho |
| Chaveiro | Média | Média-baixa, alta urgência | Diferencial e ticket |
| Motorista resgate / substituto | Média | Baixa ocorrência, alto valor | Nicho e marca |
| Botão de emergência | Alta emocional | Baixa | Confiança |

### 5.3 Concorrência

**Direta (apps de guincho):** Cadê Guincho, Reboque.me, apps regionais (SOS Guincho, Guincho Fácil).  
**Indireta:** seguradoras (Porto, Azul, Allianz), cartões com assistência, GetNinjas, Helpie.  
**Conclusão:** não há líder nacional no formato “Uber de assistência multi-serviço”. O risco não é “já existe um Uber disso”; o risco é **densidade de prestadores** e **SLA**.

---

## 6. Público-alvo

### B2C (primeiro)

- Motoristas urbanos 25–55 anos, carro próprio
- Quem circula à noite (bar, evento, trabalho)
- Motoristas de app e entregadores
- Quem já passou por blitz, pane ou chave trancada

### B2B (depois da prova regional)

- Frotas e locadoras
- Oficinas (destino do reboque + indicação)
- Estacionamentos e shoppings
- Seguradoras (white-label / acionamento digital)

---

## 7. Modelo de negócio

### 7.1 Papéis

| Papel | Quem é | Como ganha / paga |
| ----- | ------ | ----------------- |
| Cliente | Pessoa física | Paga o serviço (avulso) ou assina plano |
| Prestador | Guincho, chaveiro, mecânico, borracheiro, motorista | Recebe o serviço menos a comissão; pode pagar plano de destaque |
| Admin / operação | Time MobiliAuto | Despacha, credencia, resolve disputa |
| Parceiro B2B | Oficina, seguradora, frota | Comissão, mensalidade ou take-rate |

### 7.2 Receitas

1. **Comissão por serviço (principal no MVP)** — 10% a 25% sobre o valor pago pelo cliente.
2. **Pay-per-use** — o cliente paga só quando usa (Pix, cartão; dinheiro só se necessário no início).
3. **Plano cliente (pós-validação)** — prioridade, desconto, N acionamentos/mês. Referência antiga: ~R$ 19,90/mês ou ~R$ 199/ano (a recalibrar com custo real de atendimento).
4. **Plano prestador** — destaque no match, leads ilimitados, painel.
5. **B2B** — frotas, locadoras, oficinas (comissão ou mensalidade).
6. **Ads nativos** — só com base grande; não entra no MVP.

### 7.3 Precificação operacional (referência, não tabela final)

Valores de mercado usados nas conversas; a operação regional precisa fechar tabela com prestadores.

| Serviço | Faixa de ticket (cliente) | Lógica |
| ------- | ------------------------- | ------ |
| Motorista (substituto / resgate) | R$ 60–120 | taxa base + km |
| Guincho | R$ 80–250+ | tipo + km + destino |
| Chaveiro / mecânico / borracheiro | a definir por cidade | visita + peça/insumo |

Regra de preço no produto: **mostrar estimativa antes de confirmar**. Captura do pagamento **após conclusão** (autorização prévia no cartão quando disponível).

### 7.4 Operação híbrida (decisão importante)

No início a densidade de prestadores será baixa. Por isso o admin **pode solicitar o socorro em nome do cliente** (WhatsApp, telefone, botão de emergência), escolhendo o prestador no painel.

Dados mínimos desse fluxo:

- Cliente: nome, telefone, localização, tipo de ocorrência, destino (se houver)
- Prestador: empresa, motorista, placa, tipo de veículo, telefone, origem, ETA
- Operação: ID do chamado, canal (app / WhatsApp / telefone), operador, status, pagamento, valor

Isso não contradiz o app 100% digital: o digital é o alvo; a central é a **rede de segurança** até a liquidez da praça.

---

## 8. Go-to-market

### 8.1 Estratégia de entrada

1. Escolher **uma cidade / região metropolitana** com alta frota e vida noturna (ex.: Curitiba e RMC, origem implícita nas conversas, ou outra praça do fundador).
2. Credenciar **guinchos + chaveiros + mecânicos** antes do launch (oferta antes da demanda).
3. Lançar MVP só com esses três serviços.
4. Adquirir clientes em: grupos de motoristas de app, estacionamentos, bares, oficinas, conteúdo de “o que fazer na blitz”.
5. Só então ligar borracheiro, motorista e planos.

### 8.2 Aquisição

- Oferta de primeiro chamado com taxa reduzida
- Parceria com oficinas (destino padrão do reboque)
- Indicação prestador ↔ cliente
- Conteúdo / ads locais (blitz, pane, chave)

### 8.3 Oferta ao sócio desenvolvedor

O projeto está no estágio: ideia e fluxos validados, identidade e telas exploradas, diferencial claro. Falta o braço técnico.

Proposta: **equity desde o início**, construção conjunta do MVP, stack aberta (React Native / Node). Não é freelance.

---

## 9. Projeção financeira

As simulações das conversas originais (break-even no mês 6–7 com ~R$ 80 mil de captação e 500 assinantes) são **otimistas demais** para um marketplace de dois lados. Abaixo, um recorte mais útil para decisão.

### 9.1 Investimento inicial (ordem de grandeza)

| Item | Faixa |
| ---- | ----- |
| MVP (apps cliente + prestador + API + admin mínimo) | R$ 35.000–80.000 (ou equity do sócio técnico) |
| Design / UI kit | R$ 5.000–10.000 (parte já explorada) |
| Infra (cloud, Maps, push, storage) | R$ 3.000 setup + R$ 600–2.000/mês |
| Credenciamento da primeira praça | tempo + incentivo a prestador |
| Marketing de lançamento local | R$ 5.000–15.000 |

### 9.2 Unidade econômica (a validar no piloto)

Exemplo ilustrativo, **não meta contratual**:

- Ticket médio guincho: R$ 180
- Comissão 15% → R$ 27 por chamado para a plataforma
- 10 chamados/dia × 30 dias = 300/mês → ~R$ 8.100 de take-rate
- 3.000 chamados/mês (visão de escala citada no pitch) × R$ 180 × 15% → **R$ 81.000/mês** — isso é **cenário de escala**, não mês 1

**Ponto de equilíbrio operacional** depende do burn da equipe. Com operação enxuta (fundador + sócio tech + plantão), o piloto precisa provar:

1. Tempo médio de aceite < 2–3 min
2. SLA de chegada aceitável na praça
3. NPS / nota ≥ 4,5
4. Recompra (2º chamado) em 90 dias
5. Comissão cobrindo Maps + pagamento + suporte

### 9.3 Custos recorrentes típicos

| Item | Faixa mensal |
| ---- | ------------ |
| Equipe (dev + operação) | variável (equity vs. caixa) |
| Hospedagem / DB | R$ 600–1.500 |
| Google Maps / Places / Distance Matrix | R$ 300–2.000+ (cresce com uso) |
| Gateway de pagamento | % por transação |
| Atendimento | plantão 24h (o maior custo oculto) |
| Incentivo a prestador (garantia de chamado) | no início, alto |

**Atenção:** emergência 24h exige plantão humano mesmo com app. Isso precisa entrar no plano de caixa, senão o produto quebra no primeiro feriado.

---

## 10. Riscos e mitigações

| Risco | Mitigação |
| ----- | --------- |
| Poucos prestadores no horário noturno | garantia mínima de chamado, plantão da central, exclusividade regional no início |
| Cancelamento depois do deslocamento | pré-autorização, taxa de cancelamento, bloqueio de reincidentes |
| Preço abusivo do prestador | tabela, estimativa prévia, avaliação, descredenciamento |
| Concorrente de guincho já conhecido | não competir só em guincho; empilhar chaveiro + motorista + UX |
| Regulatório (motorista, blitz, chave automotiva) | prestador com CNH e documentos; sem serviços médicos; termos claros |
| Fraude / segurança da passageira-condutora | verificação, foto, placa, rota compartilhada, botão de emergência |
| Custo de Maps | cache de autocomplete, Debounce, geocoding só no confirm |
| LGPD | minimização de dados, exclusão de conta, criptografia em trânsito |

---

## 11. Visão de futuro (fora do MVP)

- Calendário veicular (IPVA, licenciamento, revisão)
- Documentos digitais (CNH, CRLV) com lembrete
- Histórico de manutenção
- Modo segurança (compartilhar rota)
- Assistente pós-blitz (passo a passo; jurídico só com parceiro)
- Cashback / pontos
- White-label para frotas e seguradoras
- Expansão cidade a cidade

---

## 12. Decisões que este plano considera fechadas

1. Nome: **MobiliAuto**.
2. Cinco serviços no produto completo; **três no MVP** (guincho, chaveiro, mecânico).
3. Sem remoção hospitalar e sem hospedagem.
4. Motorista tem dois modos: resgate de blitz e substituto.
5. Monetização inicial: **comissão + avulso**; assinatura depois.
6. Operação **híbrida** (app + admin despachando).
7. Lançamento **regional**.
8. Próximo passo de negócio: **sócio desenvolvedor** para o MVP.

O detalhamento técnico, telas, dados e sprints estão no [plano de desenvolvimento](./plano-de-desenvolvimento.md).
