
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
                <Footer>
                    <GithubLink href="https://github.com/officialcmg/gascheck" target="_blank" rel="noopener noreferrer">
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true">
                            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        View source on GitHub
                    </GithubLink>
                </Footer>
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

const Footer = styled.footer`
    margin-top: 2rem;
    text-align: center;
`;

const GithubLink = styled.a`
    color: #0070f3;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: color 0.3s ease;

    &:hover {
        color: #3291ff;
    }

    svg {
        margin-right: 0.5rem;
    }
`;