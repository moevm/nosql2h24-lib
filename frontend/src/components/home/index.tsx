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
	Fieldset,
	Stack,
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText,
	createListCollection,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaDownload, FaHome } from "react-icons/fa";
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
import { Field } from "../ui/field";
import { SelectLabel } from "../ui/select";

export const Home = () => {
	const [genres, setGenres] = useState<any>();

	useEffect(() => {
		fetch("http://localhost:8081/books/genres")
			.then((r) => r.json())
			.then(setGenres);
	}, []);

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

	const geners = createListCollection({
		items: [
			{ label: "Не выбрано", value: "" },
			...(genres || []).map((el: any) => ({
				label: el,
				value: el,
			})),
		],
	});

	const [bookForm, setBookForm] = useState({
		name: "",
		release_year_from: "",
		release_year_to: "",
		description: "",
		author: "",
		num_pages_from: "",
		num_pages_to: "",
		genre: "",
		link: "",
	});

	const [authorForm, setAuthorForm] = useState({
		name: "",
		biography: "",
		books: "",
	});

	function handleBookSearch() {
		let a = Object.fromEntries(Object.entries(bookForm).filter((el) => !!el[1]));
		if (Object.keys(a).length == 0) {
			return;
		}
		fetch("http://localhost:8081/books/search", {
			method: "POST",
			body: JSON.stringify({
				search_fields: Object.keys(a),
				search_terms: Object.values(a),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => setBooks(res));
	}

	function handleAuthSearch() {
		let a = Object.fromEntries(Object.entries(authorForm).filter((el) => !!el[1]));
		fetch("http://localhost:8081/authors/search", {
			method: "POST",
			body: JSON.stringify({
				search_fields: Object.keys(a),
				search_terms: Object.values(a),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => setAuthors(res));
	}

	async function exportF() {
		try {
			const res = await fetch("http://localhost:8081/export");
			const data = await res.json();
			const jsonString = JSON.stringify(data, null, 2);

			const blob = new Blob([jsonString], { type: "application/json" });

			const url = URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = url;
			a.download = "output.json";
			document.body.appendChild(a);
			a.click();

			// Очищаем ресурсы
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Ошибка при запросе:", error);
		}
	}

	function importF() {
		const fileInput = document.getElementById("fileinput") as HTMLInputElement; // Получаем элемент <input type="file">

		// Проверяем, выбран ли файл
		if (fileInput?.files?.length === 0) {
			console.error("Файл не выбран");
			return;
		}

		// @ts-ignore
		const file = fileInput.files[0]; // Получаем первый выбранный файл
		console.log(file);
		// Создаём объект FormData и добавляем файл
		const formData = new FormData();
		formData.append("file", file);

		// Отправляем файл на сервер
		fetch("http://localhost:8081/import", {
			method: "POST",
			body: formData,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}).catch((error) => {
			console.error("Ошибка при загрузке файла:", error);
		});
	}

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
														value={authorForm.name}
														onChange={(e) => setAuthorForm((l) => ({ ...l, name: e.target.value }))}
													/>
												</Field>

												<Field label="Биография">
													<Input
														value={authorForm.biography}
														onChange={(e) => setAuthorForm((l) => ({ ...l, author: e.target.value }))}
													/>
												</Field>

												<Field label="Книга">
													<Input
														value={authorForm.books}
														onChange={(e) => setAuthorForm((l) => ({ ...l, description: e.target.value }))}
													/>
												</Field>
											</Stack>
										</Fieldset.Content>
									</Fieldset.Root>
								</DrawerBody>
								<DrawerFooter>
									<DrawerActionTrigger asChild>
										<Button variant="outline">Закрыть</Button>
									</DrawerActionTrigger>
									<DrawerActionTrigger asChild>
										<Button onClick={handleAuthSearch}>Поиск</Button>
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
									<DrawerTitle>Поиск по книгам</DrawerTitle>
								</DrawerHeader>
								<DrawerBody>
									<Fieldset.Root size="lg" maxW="md">
										<Fieldset.Content>
											<Stack>
												<Field label="Название">
													<Input
														value={bookForm.name}
														onChange={(e) => setBookForm((l) => ({ ...l, name: e.target.value }))}
													/>
												</Field>

												<Field label="Автор">
													<Input
														value={bookForm.author}
														onChange={(e) => setBookForm((l) => ({ ...l, author: e.target.value }))}
													/>
												</Field>

												<Field label="Описание">
													<Input
														value={bookForm.description}
														onChange={(e) => setBookForm((l) => ({ ...l, description: e.target.value }))}
													/>
												</Field>
												<Field label="Ссылка">
													<Input
														value={bookForm.link}
														onChange={(e) => setBookForm((l) => ({ ...l, link: e.target.value }))}
													/>
												</Field>
												<Field label="Кл-во страниц">
													<Input
														placeholder="от"
														type="number"
														value={bookForm.num_pages_from}
														onChange={(e) => setBookForm((l) => ({ ...l, num_pages_from: e.target.value }))}
													/>
													<Input
														placeholder="до"
														type="number"
														value={bookForm.num_pages_to}
														onChange={(e) => setBookForm((l) => ({ ...l, num_pages_to: e.target.value }))}
													/>
												</Field>
												<Field label="Год">
													<Input
														placeholder="от"
														type="number"
														value={bookForm.release_year_from}
														onChange={(e) =>
															setBookForm((l) => ({ ...l, release_year_from: e.target.value }))
														}
													/>
													<Input
														placeholder="до"
														type="number"
														value={bookForm.release_year_to}
														onChange={(e) => setBookForm((l) => ({ ...l, release_year_to: e.target.value }))}
													/>
												</Field>
											</Stack>

											<SelectRoot
												collection={geners}
												onValueChange={(e) => setBookForm((l) => ({ ...l, genre: e.value[0] }))}
											>
												<SelectLabel>Жанр</SelectLabel>
												<SelectTrigger>
													<SelectValueText placeholder="Выдерете жанр" />
												</SelectTrigger>
												<SelectContent>
													{geners.items.map((movie) => (
														<SelectItem item={movie} key={movie.value}>
															{movie.label}
														</SelectItem>
													))}
												</SelectContent>
											</SelectRoot>
										</Fieldset.Content>
									</Fieldset.Root>
								</DrawerBody>
								<DrawerFooter>
									<DrawerActionTrigger asChild>
										<Button variant="outline">Закрыть</Button>
									</DrawerActionTrigger>
									<DrawerActionTrigger asChild>
										<Button onClick={handleBookSearch}>Поиск</Button>
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
						<IconButton onClick={exportF}>
							<FaDownload />
						</IconButton>
						<IconButton>
							<Input type="file" id="fileinput" onChange={importF} />
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
						{books?.map((el: any, i: any) => {
							return (
								<Table.Row key={i}>
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
						{authors?.map?.((el: any, i: any) => {
							return (
								<Table.Row key={i}>
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
