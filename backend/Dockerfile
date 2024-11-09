FROM python

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8081

CMD [ "python", "main.py" ]