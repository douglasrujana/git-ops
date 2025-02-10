import * as AWS from 'aws-sdk';
const costExplorer = new AWS.CostExplorer();

// Configurar AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Cambia la región si es necesario

const ec2 = new AWS.EC2();
const s3 = new AWS.S3();
const rds = new AWS.RDS();
const lambda = new AWS.Lambda();
const dynamodb = new AWS.DynamoDB();

async function listEC2Instances() {
  const instances = await ec2.describeInstances().promise();
  return instances.Reservations?.flatMap(res => res.Instances?.map(i => i.InstanceId)) || [];
}

async function listS3Buckets() {
  const buckets = await s3.listBuckets().promise();
  return buckets.Buckets?.map(b => b.Name) || [];
}

async function listRDSInstances() {
  const dbInstances = await rds.describeDBInstances().promise();
  return dbInstances.DBInstances?.map(db => db.DBInstanceIdentifier) || [];
}

async function listLambdaFunctions() {
  const functions = await lambda.listFunctions().promise();
  return functions.Functions?.map(fn => fn.FunctionName) || [];
}

async function listDynamoDBTables() {
  const tables = await dynamodb.listTables().promise();
  return tables.TableNames || [];
}

async function main() {
  console.log('🔍 Escaneando recursos en AWS que generan costos...\n');

  const [ec2Instances, s3Buckets, rdsInstances, lambdaFunctions, dynamoTables] = await Promise.all([
    listEC2Instances(),
    listS3Buckets(),
    listRDSInstances(),
    listLambdaFunctions(),
    listDynamoDBTables(),
  ]);

  console.log('⚡ **Resumen de recursos activos:**\n');
  console.log(`🖥  EC2 Instances: ${ec2Instances.length ? ec2Instances.join(', ') : 'Ninguna'}`);
  console.log(`📦 S3 Buckets: ${s3Buckets.length ? s3Buckets.join(', ') : 'Ninguno'}`);
  console.log(`🛢  RDS Databases: ${rdsInstances.length ? rdsInstances.join(', ') : 'Ninguna'}`);
  console.log(`🖥  Lambda Functions: ${lambdaFunctions.length ? lambdaFunctions.join(', ') : 'Ninguna'}`);
  console.log(`📂 DynamoDB Tables: ${dynamoTables.length ? dynamoTables.join(', ') : 'Ninguna'}`);

  console.log('\n🔎 Revisa estos servicios en la consola de AWS para verificar costos.');
}

main().catch(error => console.error('❌ Error al listar los recursos:', error));
