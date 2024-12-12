/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Group, Heading, IconButton, Table, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { getCookie } from "../../utils";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
export const Author = () => {
	const [author, setAuthor] = useState<any>();
	const [books, setBooks] = useState<any>();
	const l = useLocation();

	useEffect(() => {
		fetch("http://localhost:8081/authors/" + l.pathname.split("/").at(-1))
			.then((r) => r.json())
			.then((r) => {
				if (r?.books) {
					Promise.all(
						r?.books?.map((el: any) => {
							return fetch("http://localhost:8081/books/" + el);
						})
					)
						.then((el) => Promise.all(el.map((i) => i.json())))
						.then(setBooks);
				}
				return r;
			})
			.then(setAuthor);
	}, []);

	const [user, setUser] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/users/" + getCookie("user_id"))
			.then((r) => r.json())
			.then(setUser);
	}, []);
	console.log(author);
	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between" mb={10}>
				<Flex gap="40px" alignItems="center">
					<Text>{author?.name}</Text>
					<Group attached></Group>
					<Group>
						<Link to="/">
							<IconButton>
								<FaHome />
							</IconButton>
						</Link>
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
						{books?.map((el: any, i: any) => {
							return (
								<Table.Row key={i}>
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
