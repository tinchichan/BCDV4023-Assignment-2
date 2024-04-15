import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Form, Button, Card, Image } from 'react-bootstrap';

const contractAddress = '0xeaA211906397ca9c0858A00549ADA5607746cd51';

function App() {
  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({ pairs: '' });
  const [contract, setContract] = useState(null); // State for storing the contract instance

  const { pairs } = item;

  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getChainLinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  useEffect(() => {
    async function initializeProvider() {
      // Wait for window.ethereum to be available
      if (window.ethereum) {
        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer
        const contractInstance = new ethers.Contract(contractAddress, ABI, signer); // Create the contract instance
        setContract(contractInstance); // Store the contract instance in state
      } else {
        // Handle case where MetaMask is not available
        console.log("MetaMask is not available");
      }
    }
    initializeProvider();
  }, [ABI]);

  const getPair = async () => {
    if (!contract) return; // Check if contract instance is available
    try {
      const gasLimit = 2000000;
      const contractPrice = await contract.getChainLinkDataFeedLatestAnswer({ gasLimit });
      setStoredPrice('$' + parseInt(contractPrice) / 100000000);
    } catch (error) {
      console.error('Error getting pair:', error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setStoredPrice('');
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${pairs}`);
  };

  return (
    <div className='container'>
      <Image
        src='https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png'
        width={200}
        height={200}
        fluid
        className='mt-5'
      />
      <hr />
      <div>
        <Card style={{ width: '32rem' }} className='mt-5 shadow bg-body rounded'>
          <Card.Header as='h5'>Conversion Pair</Card.Header>
          <Card.Body>
            {' '}
            <div className='col'>
              <form onSubmit={handleSubmit}>
                <Form.Group controlId='pairs'>
                  <Form.Check
                    value='BTC/USD'
                    type='radio'
                    aria-label='radio 1'
                    label='BTC/USD'
                    onChange={handleChange}
                    checked={pairs === 'BTC/USD'}
                  />
                  <Form.Check
                    value='ETH/USD'
                    type='radio'
                    aria-label='radio 2'
                    label='ETH/USD'
                    onChange={handleChange}
                    checked={pairs === 'ETH/USD'}
                  />
                  <Form.Check
                    value='LINK/USD'
                    type='radio'
                    aria-label='radio 3'
                    label='LINK/USD'
                    onChange={handleChange}
                    checked={pairs === 'LINK/USD'}
                  />
                  <Form.Check
                    value='BTC/ETH'
                    type='radio'
                    aria-label='radio 4'
                    label='BTC/ETH'
                    onChange={handleChange}
                    checked={pairs === 'BTC/ETH'}
                  />
                </Form.Group>
              </form>
              <div className='mt-5'>
                <Button variant='outline-primary' size='sm' type='submit' onClick={getPair}>
                  Get Answer From Price Oracle
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div>
          <Card style={{ width: '32rem' }} className='mt-5 shadow bg-body rounded'>
            <Card.Header as='h5'>Result</Card.Header>
            <Card.Body>
              <div className='col'>
                <h5>{pairs} ➡ {storedPrice}</h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
