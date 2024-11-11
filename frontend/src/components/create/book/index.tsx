import { Button, Flex, Input } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../../../utils";

export const CreateBook = () => {
	const [name, setName] = useState("");
	const [author, setauthor] = useState("");
	const [description, setdescription] = useState("");
	const [genre, setgenre] = useState("");
	const [link, setlink] = useState("");
	const [shelf, setshelf] = useState("");

	const [year, setYaer] = useState("");
	const [num_pages, setnum_pages] = useState("");

	const nav = useNavigate();
	function handle(e: FormEvent) {
		e.preventDefault();

		fetch("http://localhost:8081/books", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				name,
				author,
				description,
				shelf,
				genre,
				link,
				year,
				num_pages,
				uploaded_by: getCookie("user_id"),
			}),
		}).then(() => {
			nav("/");
		});
	}
	return (
		<Flex w="70dvw" alignItems="center" m="auto" h="100dvh" justifyContent="center">
			<form style={{ width: "100%" }} onSubmit={handle}>
				<Flex flexDir="column" gap="20px" w="100%">
					<Input placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
					<Input placeholder="Автор" value={author} onChange={(e) => setauthor(e.target.value)} />
					<Input
						placeholder="Описание"
						value={description}
						onChange={(e) => setdescription(e.target.value)}
					/>
					<Input placeholder="Жанр" value={genre} onChange={(e) => setgenre(e.target.value)} />
					<Input placeholder="Ссылка" value={link} onChange={(e) => setlink(e.target.value)} />
					<Input placeholder="Полка" value={shelf} onChange={(e) => setshelf(e.target.value)} />

					<Input
						placeholder="Кл-во Страниц"
						value={num_pages}
						onChange={(e) => setnum_pages(e.target.value)}
						type="number"
					/>

					<Input placeholder="Год" type="number" value={year} onChange={(e) => setYaer(e.target.value)} />
					<Button type="submit">Создать книгу</Button>
				</Flex>
			</form>
		</Flex>
	);
};
