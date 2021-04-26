const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    // Create a Kafka object with some configuration
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["192.168.1.9:9092"],
    });

    // Create a kafka consumer
    const consumer = kafka.consumer({ groupId: "test" });

    // Connect
    await consumer.connect();

    console.log("Connected !");

    // Subscribing to the broker
    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    // Listening for the message broker
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Recieved message ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (error) {
    console.log(`Something bad happened ${error}`);
  }
}
