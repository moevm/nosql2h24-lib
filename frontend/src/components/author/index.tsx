/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Group, Heading, IconButton, Table, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { useLocation } from "react-router";
import { getCookie } from "../../utils";
import { Link } from "react-router-dom";
export const Author = () => {
	const [author, setAuthor] = useState<any>();
	const [books, setBooks] = useState<any>();
	const l = useLocation();

	useEffect(() => {
		fetch("http://localhost:8081/authors/" + l.pathname.split("/").at(-1))
			.then((r) => r.json())
			.then((r) => {
				Promise.all(
					r?.books?.map((el: any) => {
						return fetch("http://localhost:8081/books/" + el);
					})
				)
					.then((el) => Promise.all(el.map((i) => i.json())))
					.then(setBooks);
				return r;
			})
			.then(setAuthor);
	}, []);

	console.log(author, books);

	const [user, setUser] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/users/" + getCookie("user_id"))
			.then((r) => r.json())
			.then(setUser);
	}, []);

	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between" mb={10}>
				<Flex gap="40px" alignItems="center">
					<Text>{author?.name}</Text>
					<Group attached>
						<Button>Фильтр</Button>
						<Button>Начать поиск</Button>
					</Group>
					<Group>
						<Link to="/">
							<IconButton>
								<FaHome />
							</IconButton>
						</Link>

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
					{user?.name}
				</Text>
			</Flex>

			<Heading>Биография</Heading>
			<Text pb={3}>{author?.biography}</Text>

			<Box py={5} mt={10} borderRadius={10}>
				<Table.Root size="sm">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Название</Table.ColumnHeader>
							<Table.ColumnHeader>Автор</Table.ColumnHeader>
							<Table.ColumnHeader>Жанр</Table.ColumnHeader>
							<Table.ColumnHeader>Год</Table.ColumnHeader>
							<Table.ColumnHeader>Кол-во страниц</Table.ColumnHeader>
							<Table.ColumnHeader>Загрузил</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{books?.map((el: any) => {
							return (
								<Table.Row key={el}>
									<Table.Cell>{el?.name || "-"}</Table.Cell>
									<Table.Cell>{el?.author || "-"}</Table.Cell>
									<Table.Cell>{el?.genre || "-"}</Table.Cell>
									<Table.Cell>{el?.release_year || "-"}</Table.Cell>
									<Table.Cell>{el?.num_pages || "-"}</Table.Cell>
									<Table.Cell>{el?.uploaded_by || "-"}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
};
