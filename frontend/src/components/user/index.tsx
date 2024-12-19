import { Box, Flex, Group, IconButton, Text, Table } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../ui/data-list";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export const User = () => {
	const [user, setUser] = useState<any>();
	const location = useLocation();

	useEffect(() => {
		fetch("http://localhost:8081/users/" + location.pathname.split("/").at(-1))
			.then((r) => r.json())
			.then(setUser);
	}, []);

	const [avtiv, setavtiv] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/activities")
			.then((r) => r.json())
			.then(setavtiv);
	}, []);
	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between">
				<Flex gap="40px">
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
					{user?.login}
				</Text>
			</Flex>

			<Box py={5} mt={10} borderRadius={10}>
				<DataListRoot orientation="horizontal">
					<DataListItem label="Логин" value={user?.login} />
					<DataListItem label="Имя" value={user?.name} />
					<DataListItem label="Фамилия" value={user?.surname} />
					<DataListItem label="Дата регистрации" value={user?.created_at} />
					<DataListItem label="Последнее посещение" value={user?.visited_at} />
				</DataListRoot>
			</Box>

			<Box py={2} px={3} border="1px solid black" mt={10} borderRadius={5}>
				<Text>История действий</Text>
			</Box>

			<Box py={5} borderRadius={10}>
				<Table.Root size="sm">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Название</Table.ColumnHeader>
							<Table.ColumnHeader>Автор</Table.ColumnHeader>
							<Table.ColumnHeader>Дата создания</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{avtiv?.map((el: any) => {
							return (
								<Table.Row>
									<Table.Cell>{el.description}</Table.Cell>
									<Table.Cell>{el.user_id}</Table.Cell>
									<Table.Cell>{el.created_at}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
};
