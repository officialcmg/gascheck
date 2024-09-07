
import React, { useEffect, useState } from 'react';
import { getLatestBlock, getGasPrice } from './ethUtils';
import styled, { ThemeProvider } from 'styled-components';

function BlockData() {
    const [block, setBlock] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        try {
            const latestBlock = await getLatestBlock();
            const currentGasPrice = await getGasPrice();
            setBlock(latestBlock);
            setGasPrice(currentGasPrice); 
            
        } catch (err) {
            setError('Failed to fetch data');
            console.log(err)
            console.log(ethers)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <ThemeProvider theme={theme}>
            <LoadingMessage>Loading data...</LoadingMessage> 
        </ThemeProvider>
    ) ;
    if (error) return (
        <ThemeProvider theme={theme}>
            <ErrorMessage>{error}</ErrorMessage> 
        </ThemeProvider>
    );
    console.log("BLOCK OBJECT: \n", block);

    return (
        <ThemeProvider theme={theme}>
            <GasCheckContainer>
                <Title>Gas Check</Title>
                <SecTitle>Ethereum Mainnet</SecTitle>
                <DataGrid>
                    <DataCard>
                        <CardTitle>Gas Price</CardTitle>
                        <CardText $isPrimary={true}>{gasPrice} <SecondaryText>Gwei</SecondaryText></CardText>
                    </DataCard>
                    <DataCard>
                        <CardTitle>Block Number</CardTitle>
                        <CardText>{block.number}</CardText>
                    </DataCard>
                    <DataCard>
                        <CardTitle>Hash</CardTitle>
                        <CardText>{block.hash}</CardText>
                    </DataCard>
                    <DataCard>
                        <CardTitle>Transactions</CardTitle>
                        <CardText>{block.transactions.length}</CardText>
                    </DataCard>
                </DataGrid>
            </GasCheckContainer>
        </ThemeProvider>
      );
};

export default BlockData;

const MessageBase = styled.p`
    font-size: 1.5rem;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.cardBgColor};
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin: 2rem;
`;

const LoadingMessage = styled(MessageBase)`
    color: ${(props) => props.theme.accentColor};
`;

const ErrorMessage = styled(MessageBase)`
    color: red;
`;

// Define the theme
const theme = {
    bgColor: '#000',
    cardBgColor: '#111',
    textColor: '#fff',
    accentColor: '#0070f3',
    secondaryColor: '#888',
};
  
  // Styled Components Definitions
const GasCheckContainer = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    padding: 2rem;
`;
  
const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const SecTitle = styled(Title)`
    font-size: 1.7rem;
`;
  
const DataGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
  
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
`;
  
const DataCard = styled.div`
    background-color: ${(props) => props.theme.cardBgColor};
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
`;
  
const CardTitle = styled.h2`
    font-size: 1rem;
    color: ${(props) => props.theme.secondaryColor};
    margin-bottom: 0.5rem;
`;
  
const CardText = styled.p`
    font-size: ${(props) => (props.$isPrimary ? '2rem' : '1.25rem')};
    font-weight: bold;
    margin: 0;
    word-break: break-all;
    color: ${(props) => (props.$isPrimary ? props.theme.accentColor : props.theme.textColor)};
`;
  
const SecondaryText = styled.span`
    font-size: 1rem;
    color: ${(props) => props.theme.secondaryColor};
`;