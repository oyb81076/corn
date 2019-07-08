import long from "long";
interface IConfig {
  workerIdBits?: number;
  workerId?: number;
  dataCenterId?: number;
  twepoch?: number;
  dataCenterIdBits?: number;
  sequenceBits?: number;
}
// nodejs的性能差到无法在1ms内生成4000个
export default function snowflake({
  workerId = 0,
  dataCenterId = 0,
  twepoch = 1288834974657,
  workerIdBits = 5,
  dataCenterIdBits = 5,
}: IConfig = {}) {
  const sequenceBits = 22 - workerIdBits - dataCenterIdBits;
  const maxWorkerId = -1 ^ (-1 << workerIdBits);
  const maxDataCenterId = -1 ^ (-1 << dataCenterIdBits);
  if (sequenceBits < 1) {
    throw new Error("workerIdBits + dataCenterIdBits should low then 22");
  }
  if (workerId > maxWorkerId || workerId < 0) {
    throw new Error('config.worker_id must max than 0 and small than maxWrokerId-[' +
      maxWorkerId + ']');
  }
  if (dataCenterId > maxDataCenterId || dataCenterId < 0) {
    throw new Error('config.data_center_id must max than 0 and small than maxDataCenterId-[' +
      maxDataCenterId + ']');
  }
  return makeNextID(
    dataCenterIdBits,
    workerIdBits,
    sequenceBits,
    twepoch,
    dataCenterId,
    workerId,
  );
};

function makeNextID(
  dataCenterIdBits: number,
  workerIdBits: number,
  sequenceBits: number,
  twepoch: number,
  dataCenterId: number,
  workerId: number,
): () => Promise<string> {
  const workerIdShift = sequenceBits;
  const dataCenterIdShift = sequenceBits + workerIdBits;
  const timestampLeftShift = sequenceBits + workerIdBits + dataCenterIdBits;
  const sequenceMask = -1 ^ (-1 << sequenceBits);
  let sequence = 0;
  let lastTimestamp = -1;
  async function sleep(): Promise<number> {
    return new Promise((r) => {
      setTimeout(() => r(Date.now()), 1);
    })
  }
  return async function nextID() {
    let timestamp = Date.now();
    if (lastTimestamp === timestamp) {
      sequence = (sequence + 1) & sequenceMask;
      if (sequence === 0) {
        do {
          timestamp = await sleep();
        } while (timestamp !== lastTimestamp);
      }
    } else {
      sequence = 0;
    }
    if (timestamp < lastTimestamp) {
      throw new Error('Clock moved backwards. Refusing to generate id for ' +
        (lastTimestamp - timestamp));
    }

    lastTimestamp = timestamp;
    const centerWorkerSequenceNum = (dataCenterId << dataCenterIdShift) |
      (workerId << workerIdShift) | sequence;
    return long
      .fromValue(timestamp - twepoch)
      .shiftLeft(timestampLeftShift)
      .or(centerWorkerSequenceNum)
      .toString(10);
  }
}

