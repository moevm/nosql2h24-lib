import { Box, Button, Flex, Group, Heading, IconButton, Separator, Text } from "@chakra-ui/react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { DataListItem, DataListRoot } from "../ui/data-list";

export const Book = () => {
	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between">
				<Flex gap="40px" alignItems="center">
					<Text>Приключения Дональда Вовы</Text>
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
					{stats.map((item) => (
						<DataListItem key={item.label} label={item.label} value={item.value} />
					))}
				</DataListRoot>
			</Box>

			<Heading>Описание</Heading>
			<Text pb={3}>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, voluptatum nobis. Vitae
				accusamus corporis officia adipisci perferendis sequi sed tempore quia illo minus velit deleniti, a
				rerum fugit ratione aliquid.
			</Text>
			<Separator variant="solid" py={3} />
			<Button>Взять книгу</Button>
		</Box>
	);
};
const stats = [
	{ label: "New Users", value: "234", diff: -12, helpText: "Till date" },
	{ label: "Sales", value: "£12,340", diff: 12, helpText: "Last 30 days" },
	{ label: "Revenue", value: "3,450", diff: 4.5, helpText: "Last 30 days" },
];
