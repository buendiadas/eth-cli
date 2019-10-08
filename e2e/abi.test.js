const path = require('path')
const shell = require('shelljs')

const binPath = path.join(__dirname, '..', 'bin', 'run')

const erc20Abi = require('./abis/ERC20.json')
const erc721Abi = require('./abis/ERC721.json')

describe('abi', () => {
  describe('abi:list', () => {
    it('should return the list of supported tokens', async () => {
      const result = shell.exec(`${binPath} abi:list`, { silent: true })

      expect(result.code).toEqual(0)

      expect(result.stdout.trim()).toEqual('erc20\nerc721')
    })
  })
  describe('abi:methods', () => {
    it('shows the methods of a given abi', () => {
      const result = shell.exec(`${binPath} abi:methods erc20`, { silent: true })

      expect(result.code).toEqual(0)

      expect(result.stdout.split('\n')).toHaveLength(10)
    })
  })

  describe('abi:show', () => {
    it('should return the ERC20 abi', () => {
      const result = shell.exec(`${binPath} abi:show erc20`, { silent: true })

      expect(result.code).toEqual(0)

      const resultExpected = JSON.parse(result.stdout)
      expect(resultExpected).toMatchObject(erc20Abi)
    })
    it('should return the ERC721 abi', () => {
      const result = shell.exec(`${binPath} abi:show erc721`, { silent: true })

      expect(result.code).toEqual(0)

      const resultExpected = JSON.parse(result.stdout)
      expect(resultExpected).toMatchObject(erc721Abi)
    })
    it('errors when an unknown abi is used', () => {
      const result = shell.exec(`${binPath} abi:show foobar`, { silent: true })

      expect(result.code).not.toEqual(0)
    })
  })
})
