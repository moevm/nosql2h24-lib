import { Box, Button, Flex, Group, IconButton, Text, Table } from "@chakra-ui/react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { DataListItem, DataListRoot } from "../ui/data-list";

export const User = () => {
	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between">
				<Flex gap="40px">
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
					vova
				</Text>
			</Flex>

			<Box py={5} mt={10} borderRadius={10}>
				<DataListRoot orientation="horizontal">
					<DataListItem label="Логин" value="фыафыа" />
					<DataListItem label="Имя" value="фыафыа" />
					<DataListItem label="Фамилия" value="фыафыа" />
					<DataListItem label="Дата регистрации" value="фыафыа" />
					<DataListItem label="Последнее посещение" value="фыафыа" />
				</DataListRoot>
			</Box>

			<Box py={2} px={3} border="1px solid black" mt={10} borderRadius={5}>
				<Text>Взятые книги</Text>
			</Box>

			<Box py={5} borderRadius={10}>
				<Table.Root size="sm">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Название</Table.ColumnHeader>
							<Table.ColumnHeader>Автор</Table.ColumnHeader>
							<Table.ColumnHeader>Жанр</Table.ColumnHeader>
							<Table.ColumnHeader>Дата взятия</Table.ColumnHeader>
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
						</Table.Row>
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
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
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
							<Table.ColumnHeader>Жанр</Table.ColumnHeader>
							<Table.ColumnHeader>Дата взятия</Table.ColumnHeader>
							<Table.ColumnHeader>Дата возврата</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
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
							<Table.Cell>1</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>-</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
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
							<Table.Cell>-</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
};
