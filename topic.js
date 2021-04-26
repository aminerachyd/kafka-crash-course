const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    // Create a Kafka object with some configuration
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["192.168.1.9:9092"],
    });

    // Create a kafka admin
    const admin = kafka.admin();

    // Connect
    await admin.connect();

    console.log("Connected !");

    // Create topics
    // A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });

    console.log("Created Successsfully !");

    await admin.disconnect();
  } catch (error) {
    console.log(`Something bad happened ${error}`);
  } finally {
    process.exit(0);
  }
}
