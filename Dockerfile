FROM python:3.11
WORKDIR /
COPY . .
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
WORKDIR src/backend
CMD ["gunicorn", "app:app"]