/*
 * Fetch all assets in OpenSea belonging to the wallet address
 */
const fetchAssets = function(offset, previousResponse, address) {
  if (address) {
    return fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=${offset}&limit=20`)
      .then(response => response.json())
      .then(data => {
        const newResponse = [...previousResponse, ...data['assets']]

        if (data['assets'] && data['assets'].length > 0) {
          offset = offset + 50;
          return get_assets(offset, newResponse, address);
        }

        return newResponse;
      })
  }
}

const contractAddress = '<enter_contract_address_here';
const allAccountAssets = await fetchAssets(0, [], accounts[0])
const tokenIds = [];

/*
 * Loops through assets of address and checks which are equal
 * to the contractAddress specified. Stores all token IDs of
 * the assets belonging to that contractAddress in an array
 * named tokenIds.
 */
if (allAccountAssets) {
  for (const asset of allAccountAssets) {
    if (asset.assetContract && asset.assetContract.address) {
      if (asset.assetContract.address.toLowerCase() === contractAddress.toLowerCase()) {
        tokenIds.push(asset.token_id)
      }
    }
  }
  setTokenIds(tokenIds);
}
