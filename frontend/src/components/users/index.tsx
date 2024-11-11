import { Box, Button, Flex, Group, IconButton, Input, Text, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { Link } from "react-router-dom";

export const Users = () => {
	const [users, setUsers] = useState<any>(null);

	useEffect(() => {
		fetch("http://localhost:8081/users")
			.then((res) => res.json())
			.then(setUsers);
	}, []);

	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between">
				<Flex gap="40px">
					<Group attached>
						<Input />
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
					vova
				</Text>
			</Flex>
			<Box py={5} px={3} border="1px solid black" mt={10} borderRadius={10}>
				<Text>Пользователи</Text>
			</Box>

			<Box py={5} mt={10} borderRadius={10}>
				<Table.Root size="sm">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>ID</Table.ColumnHeader>
							<Table.ColumnHeader>Логин</Table.ColumnHeader>
							<Table.ColumnHeader>Дата регистрации</Table.ColumnHeader>
							<Table.ColumnHeader>Имя</Table.ColumnHeader>
							<Table.ColumnHeader>Последнее посещение</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{users?.map((el: any) => {
							return (
								<Table.Row key={el.login}>
									<Table.Cell>{el?._id}</Table.Cell>
									<Table.Cell>
										<Link className="link" to={`/user/${el?.login}`}>
											{el?.login || "-"}
										</Link>
									</Table.Cell>
									<Table.Cell>{el?.created_at}</Table.Cell>
									<Table.Cell>{el?.name}</Table.Cell>
									<Table.Cell>{el?.visited_at}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
};
