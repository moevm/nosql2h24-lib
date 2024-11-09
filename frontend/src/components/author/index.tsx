import { Box, Button, Flex, Group, Heading, IconButton, Table, Text } from "@chakra-ui/react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";

export const Author = () => {
	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between" mb={10}>
				<Flex gap="40px" alignItems="center">
					<Text>Дональд Вова</Text>
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

			<Heading>Биография</Heading>
			<Text pb={3}>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, voluptatum nobis. Vitae
				accusamus corporis officia adipisci perferendis sequi sed tempore quia illo minus velit deleniti, a
				rerum fugit ratione aliquid.
			</Text>

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
						<Table.Row>
							<Table.Cell>1</Table.Cell>
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
							<Table.Cell>1</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
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
							<Table.Cell>1</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>1</Table.Cell>
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
