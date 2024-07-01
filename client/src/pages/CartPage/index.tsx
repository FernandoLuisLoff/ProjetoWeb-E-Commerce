import { Box, Flex, Heading, Spacer, Text, Button, Image, Stack, Divider, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { IProduct } from "@/commons/interfaces";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export function CartPage() {
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

    const handleQuantityChange = (id: string, value: number) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: value
        }));
    };

    const handleRemove = (id: string) => {
        const updatedCart = cartProducts.filter(product => product.id?.toString() !== id);
        setCartProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setQuantities(prevQuantities => {
            const { [id]: _, ...rest } = prevQuantities;
            return rest;
        });
    };

    const total = cartProducts.reduce((acc, product) => acc + product.price * (quantities[product.id!] || 1), 0);

    return (
        <>
        <Box p={4}>
        <Heading mb={4}>Carrinho de Compras</Heading>
        {cartProducts.length === 0 ? (
            <Text>Seu carrinho está vazio.</Text>
        ) : (
            <Stack>
            {cartProducts.map((product, index) => (
                <Flex alignItems="center" mb={4}>
                    <Flex alignItems="center">
                        <Image src={product.url_img} alt={product.name} boxSize="50px" />
                        <Box ml={4}>
                        <Text fontWeight="bold">{product.name}</Text>
                        <Text>R$ {product.price.toFixed(2)}</Text>
                        </Box>
                    </Flex>
                    <Spacer />
                    <Box>
                        <NumberInput
                            id="quantity"
                            size="sm"
                            mr={4}
                            value={quantities[product.id!] || 0}
                            min={1}
                            max={99}
                            onChange={(value) => handleQuantityChange(product.id!.toString(), parseInt(value.toString()))}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Button colorScheme="red" size="sm" onClick={() => handleRemove(product.id?.toString()!)}><FaTrash /> Remover</Button>
                </Flex>
            ))}
            <Divider />
            <Flex justifyContent="space-between" mt={4}>
                <Text fontWeight="bold">Total</Text>
                <Text fontWeight="bold">R$ {total.toFixed(2)}</Text>
            </Flex>
            <Link to="/finaly">
                <Button colorScheme="green" className="w-100">Finalizar Compra</Button>
            </Link>
            <Link to="/">
                <Button colorScheme="gray" className="w-100">Continuar Comprando</Button>
            </Link>
            </Stack>
        )}
        </Box>
        </>
    );
};