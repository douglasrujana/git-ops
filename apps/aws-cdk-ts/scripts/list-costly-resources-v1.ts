import * as AWS from 'aws-sdk';

// Configura la región
AWS.config.update({ region: 'us-east-1' });

// Clientes de AWS
const ec2 = new AWS.EC2();
const s3 = new AWS.S3();
const rds = new AWS.RDS();
const lambda = new AWS.Lambda();
const costExplorer = new AWS.CostExplorer();

// Función para obtener instancias de EC2
async function getEC2Instances() {
  const instances = await ec2.describeInstances().promise();
  return instances.Reservations?.flatMap((res: AWS.EC2.Reservation) =>
    res.Instances?.map((i: AWS.EC2.Instance) => i.InstanceId)
  ) || [];
}

// Función para obtener buckets de S3
async function getS3Buckets() {
  const buckets = await s3.listBuckets().promise();
  return buckets.Buckets?.map((b: AWS.S3.Bucket) => b.Name) || [];
}

// Función para obtener bases de datos RDS
async function getRDSInstances() {
  const dbInstances = await rds.describeDBInstances().promise();
  return dbInstances.DBInstances?.map((db: AWS.RDS.DBInstance) => db.DBInstanceIdentifier) || [];
}

// Función para obtener funciones Lambda
async function getLambdaFunctions() {
  const functions = await lambda.listFunctions().promise();
  return functions.Functions?.map((fn: AWS.Lambda.FunctionConfiguration) => fn.FunctionName) || [];
}

// Función para obtener el costo actual de AWS
async function getCurrentAWSBill() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const params = {
    TimePeriod: {
      Start: firstDayOfMonth.toISOString().split('T')[0], // Primer día del mes
      End: today.toISOString().split('T')[0], // Hoy
    },
    Granularity: 'MONTHLY',
    Metrics: ['UnblendedCost']
  };

  const costData = await costExplorer.getCostAndUsage(params).promise();
  const totalCost = costData.ResultsByTime?.[0]?.Total?.UnblendedCost?.Amount || '0.00';
  
  return parseFloat(totalCost).toFixed(2);
}

// Función principal
async function main() {
  console.log('🔍 Buscando servicios activos en AWS...\n');

  const [ec2Instances, s3Buckets, rdsInstances, lambdaFunctions, currentBill] = await Promise.all([
    getEC2Instances(),
    getS3Buckets(),
    getRDSInstances(),
    getLambdaFunctions(),
    getCurrentAWSBill()
  ]);
  console.log('\n');
  console.log(`💻 EC2 Instances: ${ec2Instances.length > 0 ? ec2Instances.join(', ') : 'Ninguna'}`);
  console.log(`🗄️ S3 Buckets: ${s3Buckets.length > 0 ? s3Buckets.join(', ') : 'Ninguno'}`);
  console.log(`🛢️ RDS Databases: ${rdsInstances.length > 0 ? rdsInstances.join(', ') : 'Ninguna'}`);
  console.log(`⚡ Lambda Functions: ${lambdaFunctions.length > 0 ? lambdaFunctions.join(', ') : 'Ninguna'}`);
  console.log(`\n💰 **Estado de cuenta actual:** $${currentBill} USD hasta hoy\n`);
  console.log('✅ ¡Revisión completada!');
}

// Ejecutar
main().catch(console.error);
