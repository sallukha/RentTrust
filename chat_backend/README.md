# Marketplace Chat Backend

यह FastAPI आधारित real-time marketplace chat backend है। इसमें PostgreSQL में conversations और messages store होते हैं तथा WebSocket के माध्यम से live messaging, typing indicator और seen status मिलता है।

## Features

- Conversation create/get: `POST /chat/start`
- Message history with pagination: `GET /chat/{conversation_id}/messages`
- Real-time chat: `WS /ws/{user_id}`
- Message status: `sent`, `delivered`, `seen`
- PostgreSQL database और Alembic migrations
- Swagger API documentation

## Requirements

- Docker Desktop और Docker Compose (recommended)
- या Python 3.10+ और PostgreSQL 16+

## Docker से चलाना

Project folder में terminal खोलें:

```bash
docker compose up --build -d
```

पहली बार database schema बनाने के लिए:

```bash
docker compose exec api alembic upgrade head
```

API अब `http://localhost:8000` पर उपलब्ध होगी। Containers और logs देखने के लिए:

```bash
docker compose ps
docker compose logs -f api
```

बंद करने के लिए:

```bash
docker compose down
```

Database volume भी हटाना हो तो सावधानी से चलाएँ, इससे data delete होगा:

```bash
docker compose down -v
```

## Environment variables

Root folder में `.env` file बनाएँ:

```env
APP_NAME=Marketplace Chat API
HOST=0.0.0.0
PORT=8000
DEBUG=true

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/chat_db

JWT_SECRET=change-this-secret
JWT_ALGORITHM=HS256
```

Docker Compose में `DATABASE_URL` पहले से API container के लिए set है। Local setup में `postgres` की जगह `localhost` करें:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/chat_db
```

Production में strong `JWT_SECRET` रखें और `DEBUG=false` करें।

## Render deployment

इस folder को अलग Render Web Service के रूप में deploy करें:

1. Render में **New > Blueprint** चुनें और repository के root में मौजूद `render.yaml` चुनें, या Docker service बनाकर इस folder को root directory रखें।
2. `JWT_SECRET` और `DATABASE_URL` को Render environment variables से configure करें। Blueprint managed Postgres का connection string अपने-आप जोड़ता है।
3. Deploy के बाद `https://<chat-service>.onrender.com/health` खोलकर database health check करें।
4. Client में `VITE_CHAT_API_BASE_URL=https://<chat-service>.onrender.com` और `VITE_CHAT_WS_BASE_URL=wss://<chat-service>.onrender.com` सेट करके नया client build deploy करें।

Container startup पर `alembic upgrade head` अपने-आप चलता है, इसलिए participant metadata और attachment migrations भी production database में लागू हो जाती हैं। Render का local filesystem ephemeral होता है; uploaded attachments को redeploy के बाद बचाने के लिए paid persistent disk को `/app/uploads` पर mount करें या object storage जोड़ें।

## Local Python setup

अगर Docker के बजाय locally API चलानी हो, तो PostgreSQL में `chat_db` database उपलब्ध होना चाहिए। फिर:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Linux/macOS:

```bash
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

## API इस्तेमाल करना

### Health check

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{"status":"healthy","database":"connected"}
```

### Conversation शुरू करना

एक ही `product_id` और `buyer_id` के लिए existing conversation वापस मिलेगी; नहीं होने पर नई conversation बनेगी:

```bash
curl -X POST http://localhost:8000/chat/start ^
	-H "Content-Type: application/json" ^
	-d "{\"product_id\":\"66b1f2a8c4d5e6f789012347\",\"buyer_id\":\"66b1f2a8c4d5e6f789012345\",\"seller_id\":\"66b1f2a8c4d5e6f789012346\"}"
```

Linux/macOS पर इसी request के लिए:

```bash
curl -X POST http://localhost:8000/chat/start \\
	-H "Content-Type: application/json" \\
	-d '{"product_id":"66b1f2a8c4d5e6f789012347","buyer_id":"66b1f2a8c4d5e6f789012345","seller_id":"66b1f2a8c4d5e6f789012346"}'
```

Response में मिलने वाली `id` को `conversation_id` के रूप में use करें।

### Message history लेना

```bash
curl "http://localhost:8000/chat/1/messages?limit=30&offset=0"
```

`limit` 1 से 100 के बीच और `offset` 0 या उससे बड़ा होना चाहिए।

## WebSocket से live chat

Buyer और seller दोनों अपने user ID के साथ अलग WebSocket connection खोलें:

```text
ws://localhost:8000/ws/66b1f2a8c4d5e6f789012345
ws://localhost:8000/ws/66b1f2a8c4d5e6f789012346
```

Normal text message भेजने के लिए:

```json
{
	"conversation_id": 1,
	"message": "Hello, is this product available?"
}
```

Typing indicator:

```json
{"type":"typing","conversation_id":1}
```

Typing रोकने के लिए:

```json
{"type":"stop_typing","conversation_id":1}
```

Message को seen mark करने के लिए:

```json
{"type":"seen","message_id":10}
```

WebSocket से आने वाले message event में `id`, `conversation_id`, `sender_id`, `receiver_id`, `message`, `message_type`, `status` और `created_at` fields मिलती हैं।

## API documentation

Browser में खोलें:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database migrations

नई migration बनाने के लिए:

```bash
alembic revision --autogenerate -m "describe change"
```

Migration apply करने के लिए:

```bash
alembic upgrade head
```

पिछली migration पर वापस जाने के लिए:

```bash
alembic downgrade -1
```

## Project structure

```text
app/
├── api/          HTTP routes
├── websocket/    WebSocket routes और connection manager
├── models/       SQLAlchemy models और enums
├── schemas/      Pydantic request/response schemas
├── services/     Chat business logic
├── repositories/ Database queries
└── db/           Engine, sessions और dependencies
alembic/          Database migrations
tests/            Tests
```

## Troubleshooting

- `DATABASE_URL` error आए तो `.env` मौजूद है और सभी required variables भरे हुए हैं, यह जाँचें।
- Docker में API database से connect न हो तो पहले `docker compose ps` और `docker compose logs postgres` देखें।
- `relation does not exist` error आने पर `docker compose exec api alembic upgrade head` चलाएँ।
- Port `8000` या `5432` busy हो तो `docker-compose.yml` में host port बदलें। Container के अंदर PostgreSQL port `5432` ही रहेगा।
