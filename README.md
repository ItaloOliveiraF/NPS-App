# NPS-App
Projeto de uma API para coletar pesquisas de NPS, desenvolvido na trilha de NodeJS durante a Next Level Week #04 da Rocketseat.

## Objetivo

Net Promotor Score (NPS) é uma métrica utilizada para avaliar o grau de satisfação de clientes com sua marca ou empresa. Foi criada por Fred Reichheld e costuma se basear em uma simples pergunta semelhante a **"Em uma escala de 0 a 10, o quanto você idiciaria a nossa empresa para amigos e parentes?"**.

O seu cálculo leva em considerações três níveis possíveis de resposta: notas de 1 a 6 são consideradas avaliações **detratoras**, de 7 a 8 são avaliações **neutras** ou **passivas** e de 9 a 10 são consideradas como **promotoras**. A partir dessa escala a métrica utiliza a fórmula (Nº de respostas promotoras - Nº de respostas detratoras)*100/(Nº de respostas total).

A partir do valor obtido, é possível entender como está a visão de sua empresa frente a seus stakholders, sua posição no mercado frente à empresas do mesmo segmento e assim tirar insights e criar estratégias para a evolução da imagem e posicionamento da empresa.

![NPS](https://image.shutterstock.com/image-vector/formula-calculating-nps-net-promoter-600w-1445012288.jpg)

A partir essa ideia, esse projeto propões a criação de uma API para a realização coleta de pesquisas de NPS através de email e cálculo do resultado.

## Tecnologias utilizadas
* Typescript
* NodeJS
* Typeorm e Banco de Dados SQLite - para armazenamento e gerenciamento de dados
* JEST e SUPERTEST - para testes automatizados
* Nodemailer - para envio de emails
* Yup - para validação de dados

## Principais funcionalidades implementadas
* Criação de usuários (que respondem as pesquisas), empresas e pesquisas
* Envio de pesquisa por email utilizando o Nodemailer e protocolo fake de SMTP com Ethereal
* Calculo NPS por pesquisa, utilizando a fómula citada anteriormente.
* Testes automatizados para as classes de Usuários e Pesquisas

## Como utilizar

Para ter acesso, basta clonar o repositório e então rodar o comando:

```bash
yarn init
```

OBS: É preciso ter o node e o yarn instalados.

Logo após, é preciso rodar as migrations através do comando

```bash
yarn typeorm migration:run
```

e agora já temos nossas tableas criadas. A API está pronta para uso.

## Atualizações em andamento
* Comparar a note de uma pesquisa com a média de outras empresas do mesmo setor.
