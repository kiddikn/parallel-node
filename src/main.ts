import { Semaphore } from 'await-semaphore'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

const sleepCast = async (i: number, msec: number) => {
  console.log(`call => ${i}`)
  const release = await semaphore.acquire()
  console.log(`acquire => ${i}`)
  await sleep(msec)
  console.log(new Date().toString() + ` => sleep ${msec}ms`)
  release()
}

const semaphore = new Semaphore(3)
const main = async () => {
  await Promise.all([
    sleepCast(1, 300),
    sleepCast(2, 300),
    sleepCast(3, 600),
    sleepCast(4, 2000),
    sleepCast(5, 2000),
    sleepCast(6, 2000),
    sleepCast(7, 2000),
    sleepCast(8, 1000),
  ])
}

main()
