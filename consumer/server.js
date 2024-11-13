const { Kafka } = require('kafkajs');
const WebSocket = require('ws');

const kafka = new Kafka({ clientId: 'consumer', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'alert-group' });
const TOPIC = 'dados_qualidade_ar';

const ws = new WebSocket('ws://localhost:8085');

function verificarQualidadeAr(dados) {
  const LIMITE_PM25 = 50;
  return dados.pm25 > LIMITE_PM25;
}

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });
  console.log('Consumer conectado e ouvindo ao Kafka');

  await consumer.run({
    eachMessage: async ({ message }) => {
      const dados = JSON.parse(message.value);
      const alerta = verificarQualidadeAr(dados);
        console.log(dados)

      ws.send(JSON.stringify({ ...dados, alert: alerta }));
    }
  });
})();
