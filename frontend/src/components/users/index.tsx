import { Box, Flex, Group, Button, Text, Fieldset, Stack, Input, IconButton, Table } from "@chakra-ui/react";
import {
	DrawerActionTrigger,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerRoot,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { Field } from "../ui/field";
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Switch } from "../ui/switch";

export const Users = () => {
	const [users, setUsers] = useState<any>(null);

	useEffect(() => {
		fetch("http://localhost:8081/users")
			.then((res) => res.json())
			.then(setUsers);
	}, []);

	const [usersForm, setUsersForm] = useState({
		login: "",
		name: "",
		surname: "",
		created_at: "",
		created_before: false,
		visited_at: "",
		visited_before: false,
	});
	function handleUserSearch() {}

	return (
		<Box px={10} pt={5}>
			<Flex justifyContent="space-between">
				<Flex gap="40px">
					<Group attached>
						<DrawerRoot placement="start">
							<DrawerBackdrop />
							<DrawerTrigger asChild>
								<Button variant="subtle">Поиск по авторам</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Поиск по авторам</DrawerTitle>
								</DrawerHeader>
								<DrawerBody>
									<Fieldset.Root size="lg" maxW="md">
										<Fieldset.Content>
											<Stack>
												<Field label="Имя">
													<Input
														value={usersForm.name}
														onChange={(e) => setUsersForm((l) => ({ ...l, name: e.target.value }))}
													/>
												</Field>
												<Field label="Фамилия">
													<Input
														value={usersForm.surname}
														onChange={(e) => setUsersForm((l) => ({ ...l, surname: e.target.value }))}
													/>
												</Field>
												<Field label="Логин">
													<Input
														value={usersForm.login}
														onChange={(e) => setUsersForm((l) => ({ ...l, login: e.target.value }))}
													/>
												</Field>
												<Field label="Дата регистрации">
													<Input
														value={usersForm.created_at}
														onChange={(e) => setUsersForm((l) => ({ ...l, created_at: e.target.value }))}
														type="date"
													/>
												</Field>
												<Switch
													checked={usersForm.created_before}
													onCheckedChange={(e) => setUsersForm((l) => ({ ...l, created_before: e.checked }))}
												>
													Искать все до это даты
												</Switch>
												<Field label="Последнее посещение">
													<Input
														value={usersForm.visited_at}
														onChange={(e) => setUsersForm((l) => ({ ...l, visited_at: e.target.value }))}
														type="date"
													/>
												</Field>{" "}
												<Switch
													checked={usersForm.visited_before}
													onCheckedChange={(e) => setUsersForm((l) => ({ ...l, visited_before: e.checked }))}
												>
													Искать все до это даты
												</Switch>
											</Stack>
										</Fieldset.Content>
									</Fieldset.Root>
								</DrawerBody>
								<DrawerFooter>
									<DrawerActionTrigger asChild>
										<Button variant="outline">Закрыть</Button>
									</DrawerActionTrigger>
									<DrawerActionTrigger asChild>
										<Button onClick={handleUserSearch}>Поиск</Button>
									</DrawerActionTrigger>
								</DrawerFooter>
								<DrawerCloseTrigger />
							</DrawerContent>
						</DrawerRoot>
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
