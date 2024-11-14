
# Monitoramento de Qualidade do Ar

Este projeto permite monitorar a qualidade do ar em várias cidades do Brasil, utilizando WebSockets para enviar dados em tempo real e Kafka para a comunicação assíncrona. Ele exibe informações sobre a qualidade do ar, como PM2.5, PM10, CO2 e temperatura, em tempo real em uma interface web com gráficos.

## Funcionalidades

- **WebSocket**: Recebe dados de sensores de qualidade do ar em tempo real.
- **Kafka**: Utiliza Kafka para transmitir dados assíncronos de sensores.
- **Gráficos**: Exibe dados de qualidade do ar com gráficos de barras empilhadas para PM2.5, PM10, CO2 e temperatura.
- **Notificações**: Dados de sensores são atualizados periodicamente a cada 5 segundos.

## Tecnologias Utilizadas

- **WebSocket**: Comunicação em tempo real entre o servidor e o cliente.
- **Kafka**: Mensageria assíncrona para o envio de dados.
- **Chart.js**: Biblioteca para visualização de dados gráficos no frontend.

## Como Funciona

1. O **WebSocket** conecta a interface web ao servidor que envia dados a cada 5 segundos.
2. O servidor gera dados de sensores (como PM2.5, PM10, CO2 e temperatura) para diferentes cidades e estados.
3. Os dados são enviados tanto para a interface web quanto para o Kafka.
4. O **Kafka** transmite os dados para sistemas consumidores ou para persistência.

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **Kafka** (instalado e rodando na máquina local ou em um servidor)
- **WebSocket Server** em execução na porta 8085

## Instalação

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/usuario/projeto-monitoramento-ar.git
cd projeto-monitoramento-ar
```

### Passo 2: Instalar dependências

```bash
npm install
```

### Passo 3: Iniciar o Kafka

```bash
docker-compose up -d
```

### Passo 4: Iniciar o servidor WebSocket

```bash
cd producer
node server.js
```

### Passo 5: Iniciar o servidor para consumir as mensagems

```bash
cd consumer
node server.js
```

Isso irá iniciar o servidor WebSocket na porta 8085 e começar a enviar dados para os clientes conectados.

### Passo 6: Acessar a Interface Web

Abra o arquivo `index.html` em um navegador para visualizar os gráficos e dados de qualidade do ar.

## Estrutura de Arquivos

- **index.html**: Página principal com gráficos e dados de qualidade do ar.
- **server.js**: Código do servidor WebSocket que envia dados de sensores e interage com o Kafka.
- **cidades.json**: Arquivo com dados de cidades por estado para simular os dados de sensores.
