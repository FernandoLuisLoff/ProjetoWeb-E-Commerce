import { Box, Button, VStack, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IOrder, IProduct } from "@/commons/interfaces";
import { useNavigate } from "react-router-dom";
import OrderService from "@/services/OrderService";

export function FinalyPage() {
    
    const [apiError, setApiError] = useState("");
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]") as IProduct[];
        setCartProducts(cart);
        const initialQuantities = cart.reduce((acc, product) => {
            acc[product.id!] = 1;
            return acc;
        }, {} as { [key: string]: number });
        setQuantities(initialQuantities);
    }, []);

    const onFinaly = async (order: IOrder) => {
        const response = await OrderService.save(order);
        if (response.status === 201 || response.status === 200) {
            
        } else {
            setApiError("Falha ao finalizar venda!");
        }
    };

    const totalProdutos = cartProducts.reduce((acc, product) => acc + product.price * (quantities[product.id!] || 1), 0);
    const frete = 20.00;
    const total = totalProdutos + frete;

    return (
        <>
        <main className="container p-5">
            <Flex align="center" justify="center">
                <Box bg="white" p={6} rounded="md" shadow="xl" width="500px">
                    <Text fontSize="2xl" mb={4}>Finalizar da Compra</Text>
                    <VStack>
                        <Text><b>Total dos produtos:</b> R$ {totalProdutos.toFixed(2)}</Text>
                        <Text><b>Frete:</b> R$ {frete.toFixed(2)}</Text>
                        <Text><b>Valor lotal:</b> R$ {total.toFixed(2)}</Text>
                    <Button colorScheme="green" width="full">Finalizar Compra</Button>
                    </VStack>
                </Box>
            </Flex>
        </main>
        </>
    )
}