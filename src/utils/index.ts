import jsrsasign from 'jsrsasign'

export const encryptRsa = (key: string, ctx: string) => {
  const sig = new jsrsasign.KJUR.crypto.Signature({
    alg: 'SHA256withRSA'
  })
  sig.init(key)
  sig.updateString(ctx)
  return jsrsasign.hextob64(sig.sign())
}
