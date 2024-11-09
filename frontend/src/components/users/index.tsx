import { Box, Button, Flex, Group, IconButton, Input, Text, Table } from "@chakra-ui/react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";

export const Users = () => {
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
							<Table.ColumnHeader>Логин</Table.ColumnHeader>
							<Table.ColumnHeader>Дата регистрации</Table.ColumnHeader>
							<Table.ColumnHeader>Почта</Table.ColumnHeader>
							<Table.ColumnHeader>Последнее посещение</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
						</Table.Row>{" "}
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
						</Table.Row>{" "}
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
						</Table.Row>{" "}
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
};
