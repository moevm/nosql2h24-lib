import { Box, Button, Flex, Group, IconButton, Input } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../../../utils";
import { Link } from "react-router-dom";
import { CiExport } from "react-icons/ci";
import { FaHome, FaDownload } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";

export const CreateAuthor = () => {
	const [name, setName] = useState("");
	const [biography, setdescription] = useState("");
	const [books, setlink] = useState("");

	const nav = useNavigate();
	function handle(e: FormEvent) {
		e.preventDefault();

		fetch("http://localhost:8081/authors", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				name,
				biography,
				books: JSON.parse(books),
				uploaded_by: getCookie("user_id"),
			}),
		}).then(() => {
			nav("/");
		});
	}
	return (
		<Box>
			<Flex w="70dvw" alignItems="center" m="auto" h="100dvh" justifyContent="center">
				<Flex gap="40px"></Flex>
				<form style={{ width: "100%" }} onSubmit={handle}>
					<Flex flexDir="column" gap="20px" w="100%">
						<Input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
						<Input
							placeholder="Биография"
							value={biography}
							onChange={(e) => setdescription(e.target.value)}
						/>
						<Input placeholder="Книги" value={books} onChange={(e) => setlink(e.target.value)} />
						<Button type="submit">Создать автора</Button>
					</Flex>
				</form>
			</Flex>
		</Box>
	);
};
