FROM python:3.11
WORKDIR /
COPY . .
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
WORKDIR src/backend
EXPOSE 8000
CMD ["gunicorn", "app:app"]