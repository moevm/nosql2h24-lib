/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Group, Heading, IconButton, Separator, Text } from "@chakra-ui/react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { DataListItem, DataListRoot } from "../ui/data-list";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCookie } from "../../utils";

export const Book = () => {
	const [book, setBook] = useState<any>();
	const l = useLocation();

	useEffect(() => {
		fetch("http://localhost:8081/books/" + l.pathname.split("/").at(-1))
			.then((r) => r.json())
			.then(setBook);
	}, []);

	const [user, setUser] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/users/" + getCookie("user_id"))
			.then((r) => r.json())
			.then(setUser);
	}, []);

	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between">
				<Flex gap="40px" alignItems="center">
					<Text>{book?.name}</Text>
					<Group attached>
						<Button>Фильтр</Button>
						<Button>Начать поиск</Button>
					</Group>
					<Group>
						<IconButton>
							<FaHome />
						</IconButton>
						<IconButton>
							<FaDownload />
						</IconButton>
						<IconButton>
							<CiExport />
						</IconButton>
						<IconButton>
							<TbLogs />
						</IconButton>
					</Group>
				</Flex>

				<Text px={5} fontSize={20} border="1px solid black" borderRadius={10}>
					{user?.login}
				</Text>
			</Flex>

			<Box py={5} mt={10} borderRadius={10}>
				<DataListRoot orientation="horizontal">
					{Object.entries(book || {})
						.map(([label, value]) =>
							value ? <DataListItem key={label} label={mapper[label]} value={value as string} /> : null
						)
						.filter(Boolean)}
				</DataListRoot>
			</Box>

			<Heading>Описание</Heading>
			<Text pb={3}>{book?.description || "Нет описания"} </Text>
			<Separator variant="solid" py={3} />
			<Button>Взять книгу</Button>
		</Box>
	);
};
const mapper = {
	author: "Автор",
	created_at: "Создано",
	description: "Описание",
	genre: "Жанр",
	link: "Ссылка",
	name: "Имя",
	num_pages: "Кл-во страниц",
	publishing: "Год издания",
	release_year: "Выпущено",
	shelf: "Полка",
	status: "Статус",
	upload_date: "Загружено",
	uploaded_by: "Загружено",
	_id: "ID",
};
