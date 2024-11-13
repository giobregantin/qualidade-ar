const WebSocket = require('ws');
const fs = require('fs');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'producer', brokers: ['localhost:9092'] });
const producer = kafka.producer();
const TOPIC = 'dados_qualidade_ar';

const wss = new WebSocket.Server({ port: 8085 });

function carregarCidades() {
  const rawData = fs.readFileSync('../cidades.json');
  return JSON.parse(rawData);
}

function obterCidadesDoEstado(estado) {
  const cidadesPorEstado = carregarCidades();
  const cidades = cidadesPorEstado[estado];

  if (cidades && cidades.length > 0) {
    const cidadeAleatoria = cidades[Math.floor(Math.random() * cidades.length)];
    return cidadeAleatoria;
  } else {
    return estado;
  }
}

function gerarDadosSensor() {
  const estados = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Paraná', 'Rio Grande do Sul'];
  const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];

  return Promise.resolve(obterCidadesDoEstado(estadoAleatorio)).then(cidade => {
    return {
      cidadeEstado: `${cidade} - ${estadoAleatorio}`,
      estado: estadoAleatorio,
      pm25: Math.floor(Math.random() * 100),
      pm10: Math.floor(Math.random() * 500),
      co2: Math.floor(Math.random() * 1000),
      umidade: Math.floor(Math.random() * 100),
      temperatura: Math.floor(Math.random() * 40)
    };
  }).catch(erro => {
    console.error('Erro ao gerar dados de sensor:', erro);
    return null;
  });
}

(async () => {
  await producer.connect();
  console.log('Producer conectado ao Kafka');
})();

wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  setInterval(async () => {
    const dadosSensor = await gerarDadosSensor();

    if (dadosSensor) {
      ws.send(JSON.stringify(dadosSensor));

      await producer.send({
        topic: TOPIC,
        messages: [{ value: JSON.stringify(dadosSensor) }]
      });
    }
  }, 5000);
});
