import { Semaphore } from 'await-semaphore'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

interface Output {
  num: number
  at: string
}

const sleepCast = async (i: number, msec: number): Promise<Output> => {
  console.log(`call => ${i}`)
  const release = await semaphore.acquire()
  console.log(`acquire => ${i}`)
  await sleep(msec)
  if (i === 4) throw new Error('oh no')
  console.log(new Date().toString() + ` => sleep ${msec}ms`)
  release()
  return { num: i, at: new Date().toString() }
}

const semaphore = new Semaphore(3)
const main = async () => {
  const ps = await Promise.allSettled([
    sleepCast(1, 300),
    sleepCast(2, 300),
    sleepCast(3, 600),
    sleepCast(4, 2000),
    sleepCast(5, 2000),
    sleepCast(6, 2000),
    sleepCast(7, 2000),
    sleepCast(8, 1000),
  ])
  console.log(ps)

  const output: Output[] = []
  ps.map((o) => {
    if (o.status === 'fulfilled') {
      output.push(o.value)
    }
  })
  console.log(output)
}

main()
