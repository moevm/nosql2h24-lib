import { Button, Flex, Heading, Input, Link } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FormEvent } from "react";

export const Auth = () => {
	function handle(e: FormEvent) {
		e.preventDefault();
	}

	return (
		<form onSubmit={handle}>
			<Flex
				w="50%"
				m="auto"
				h="100vh"
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				gap="20px"
			>
				<Heading as="h1">E-LIB</Heading>
				<Input placeholder="Логин" />
				<Input placeholder="Пароль" />

				<Flex gap="10px">
					<Button colorPalette="blue" type="submit">
						Вход
					</Button>
					<ChakraLink asChild>
						<Link href="/registration">Регистрация</Link>
					</ChakraLink>
				</Flex>
			</Flex>
		</form>
	);
};
