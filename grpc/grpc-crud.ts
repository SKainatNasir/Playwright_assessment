import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Define types based on proto definition
interface DummyMessage {
  f_string: string;
}

// Load proto definition
const PROTO_PATH = path.join(__dirname, 'proto', 'grpcbin.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const GRPCBin = (protoDescriptor as any).grpcbin?.GRPCBin;

if (!GRPCBin) {
  throw new Error('Failed to load GRPCBin service from proto definition');
}

// Initialize gRPC client
const client = new GRPCBin(
  'grpcb.in:9000',
  grpc.credentials.createInsecure(),
  {
    'grpc.keepalive_time_ms': 30000,
    'grpc.keepalive_timeout_ms': 10000,
    'grpc.http2.min_time_between_pings_ms': 10000,
    'grpc.keepalive_permit_without_calls': 1
  }
);

// Helper function for gRPC calls
const makeGrpcCall = <T>(request: DummyMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    
    client.waitForReady(deadline, (error?: Error) => {
      if (error) {
        reject(new Error(`Connection failed: ${error.message}`));
        return;
      }

      (client as any).DummyUnary(request, (err: grpc.ServiceError | null, response: DummyMessage) => {
        if (err) {
          reject(new Error(`gRPC call failed: ${err.message}`));
        } else {
          resolve(response as T);
        }
      });
    });
  });
};

// CRUD Operations
export async function create(data: string): Promise<DummyMessage> {
  return makeGrpcCall<DummyMessage>({ f_string: data });
}

export async function getAll(): Promise<DummyMessage> {
  return makeGrpcCall<DummyMessage>({ f_string: 'getAll' });
}

export async function update(id: string, data: string): Promise<DummyMessage> {
  return makeGrpcCall<DummyMessage>({ f_string: `${id}:${data}` });
}

export async function remove(id: string): Promise<DummyMessage> {
  return makeGrpcCall<DummyMessage>({ f_string: `delete:${id}` });
}

// Close client connection
export function close(): void {
  client.close();
}

// Export client for direct access if needed
export { client };