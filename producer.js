const { Kafka } = require("kafkajs");

const msg = process.argv[2];

run();

async function run() {
  try {
    // Create a Kafka object with some configuration
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["192.168.1.9:9092"],
    });

    // Create a kafka producer
    const producer = kafka.producer();

    // Connect
    await producer.connect();

    console.log("Connected !");

    const partition = msg[0] < "N" ? 0 : 1;

    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });

    console.log(`Send Successfully ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (error) {
    console.log(`Something bad happened ${error}`);
  } finally {
    process.exit(0);
  }
}
