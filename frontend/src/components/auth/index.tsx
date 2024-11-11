import { Button, Flex, Heading, Input, Link } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export const Auth = () => {
	const [pass, setPass] = useState("");
	const [user, setUser] = useState("");
	const nav = useNavigate();

	function handle(e: FormEvent) {
		fetch("http://localhost:8081/auth", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				login: user,
				hash_password: pass,
			}),
		}).then(() => {
			nav("/");
		});
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
				<Input placeholder="Логин" value={user} onChange={(e) => setUser(e.target.value)} />
				<Input placeholder="Пароль" value={pass} onChange={(e) => setPass(e.target.value)} />

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
