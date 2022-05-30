<h1 style="color: red">HiperFit</h1>

<p>Clone o projeto usando o comando</p>

<h6 style="color: #646464">git clone https://github.com/jonatasandradedeveloper/hiperfit.git</h6>

<h3 style="color: #646464">Rode os comandos abaixo</h3>

<p>Instalar a Cli do Adonis js <b>npm i -g @adonisjs/cli</b></p>

<p>npm i ou yarn</p>

<p>Copiar o arquivo .env.example e renomear a copia como .env</p>

<p>Execute <b>adonis key:generate</b> para regenerar o APP_KEY e salve-o dentro do .env arquivo</p>

<h1 style="color: blue">DOCKER</h1>

<p>Em outro outro terminal, navegue ate a pasta do projeto e rode os comandos</p>

<p>docker-compose build</p>
<p>docker-compose up -d</p>
<p>docker-compose start</p>
<p>docker-compose stop</p>
<p>Acesse o localhost:8000</p>

<h3>Acesso</h3>
<p>Servidor: SEU IP</p>
<p>Usuário: root</p>
<p>Senha: ******</p>
<p>Base de dados: gymbackend</p>

<h3>No terminal</h3>

<p>adonis migration:run</p>

<p>adonis seed</p>

<p>adonis serve --dev</p>


<h1>Comandos Adonis</h1>

<p><b>adonis make:controller NomeDoController</b>,ele vai criar o seu controller na pasta Controllers/Http</p>
<p><b>adonis route:list</b>,ele vai listar todas as suas rotas</p>
<p><b>adonis make:migration users</b>,criando uma migration</p>
<p><b>adonis make:validator Nome</b>,cria um arquivo para validação</p>
<p><b>adonis make:ehandler</b>,lidando com exxcessões</p>
<p><b>adonis make:rollback</b>, desfazer as migrations que ja rodaram</p>