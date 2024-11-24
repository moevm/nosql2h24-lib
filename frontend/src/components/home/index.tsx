/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Button,
	Flex,
	Group,
	IconButton,
	Input,
	Text,
	Table,
	Field,
	Fieldset,
	NativeSelectField,
	NativeSelectRoot,
	Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { FaDownload, FaHome } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { getCookie } from "../../utils";
import { Link } from "react-router-dom";
import {
	DrawerRoot,
	DrawerActionTrigger,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

export const Home = () => {
	const [user, setUser] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/users/" + getCookie("user_id"))
			.then((r) => r.json())
			.then(setUser);
	}, []);

	const [books, setBooks] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/books")
			.then((r) => r.json())
			.then(setBooks);
	}, []);

	const [authors, setAuthors] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/authors")
			.then((r) => r.json())
			.then(setAuthors);
	}, []);

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
									<DrawerTitle>Drawer Title</DrawerTitle>
								</DrawerHeader>
								<DrawerBody>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
										ut labore et dolore magna aliqua.
									</p>
								</DrawerBody>
								<DrawerFooter>
									<DrawerActionTrigger asChild>
										<Button variant="outline">Закрыть</Button>
									</DrawerActionTrigger>
									<DrawerActionTrigger asChild>
										<Button>Поиск</Button>
									</DrawerActionTrigger>
								</DrawerFooter>
								<DrawerCloseTrigger />
							</DrawerContent>
						</DrawerRoot>

						<DrawerRoot placement="start">
							<DrawerBackdrop />
							<DrawerTrigger asChild>
								<Button variant="subtle">Поиск по книгам</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Drawer Title</DrawerTitle>
								</DrawerHeader>
								<DrawerBody>
									<Fieldset.Root size="lg" maxW="md">
										<Stack>
											<Fieldset.Legend>Contact details</Fieldset.Legend>
											<Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
										</Stack>

										<Fieldset.Content>
											<Field label="Name">
												<Input name="name" />
											</Field>

											<Field label="Email address">
												<Input name="email" type="email" />
											</Field>

											<Field label="Country">
												<NativeSelectRoot>
													<NativeSelectField
														name="country"
														items={["United Kingdom (UK)", "Canada (CA)", "United States (US)"]}
													/>
												</NativeSelectRoot>
											</Field>
										</Fieldset.Content>

										<Button type="submit" alignSelf="flex-start">
											Submit
										</Button>
									</Fieldset.Root>
								</DrawerBody>
								<DrawerFooter>
									<DrawerActionTrigger asChild>
										<Button variant="outline">Закрыть</Button>
									</DrawerActionTrigger>
									<DrawerActionTrigger asChild>
										<Button>Поиск</Button>
									</DrawerActionTrigger>
								</DrawerFooter>
								<DrawerCloseTrigger />
							</DrawerContent>
						</DrawerRoot>

						<Button>
							<Link to="/users">Список пользователей</Link>
						</Button>
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
					{user?.login ? (
						<Link to={`/user/${user?.login}`} className="link">
							{user?.login}
						</Link>
					) : (
						<Link to={`/auth`} className="link">
							Войти
						</Link>
					)}
				</Text>
			</Flex>

			<Flex mt={5}>
				<Group attached>
					<Button colorPalette="blue">
						<Link to="/create/book">Создать книгу</Link>
					</Button>
					<Button colorPalette="blue">
						<Link to="/create/author">Создать автора</Link>
					</Button>
				</Group>
			</Flex>
			<Box py={5} px={3} border="1px solid black" mt={10} borderRadius={10}>
				<Text>Книги, изданные автором</Text>
			</Box>

			<Box py={5} mt={10} borderRadius={10}>
				<Table.Root size="sm">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>ID</Table.ColumnHeader>
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
									<Table.Cell>
										<Link className="link" to={`/book/${el?._id}`}>
											{el?._id || "-"}
										</Link>
									</Table.Cell>
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

			<Box py={5} px={3} border="1px solid black" mt={10} borderRadius={10}>
				<Text>Авторы</Text>
			</Box>

			<Box py={5} mt={10} borderRadius={10}>
				<Table.Root size="sm">
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>ID</Table.ColumnHeader>
							<Table.ColumnHeader>Дата рождения</Table.ColumnHeader>
							<Table.ColumnHeader>Имя</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{authors?.map((el: any) => {
							return (
								<Table.Row key={el}>
									<Table.Cell>
										<Link className="link" to={`/author/${el?.name}`}>
											{el?._id || "-"}
										</Link>
									</Table.Cell>
									<Table.Cell>{el?.date_of_birth || "-"}</Table.Cell>
									<Table.Cell>
										<Link className="link" to={`/author/${el?.name}`}>
											{el?.name || "-"}
										</Link>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Root>
			</Box>
		</Box>
	);
};
