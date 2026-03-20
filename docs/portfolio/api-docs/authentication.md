# Authentication

The Synonyms API uses **Bearer token** authentication. You must include a valid token in the `Authorization` header for every request. Requests without a token, or with an invalid or expired token, return an error.

## Send a request with a token

Include your token in the `Authorization` header:

```http
Authorization: Bearer YOUR_API_TOKEN
```

The API validates the token on every request. Authentication is stateless. The API does not use sessions or cookies.

## Get an access token

You can get an API token in the following ways.

### Option 1: Developer dashboard (recommended)

1. Sign in to [dashboard.synonyms.io](https://dashboard.synonyms.io).
2. Go to **Settings > API Keys**.
3. Select **Generate new key**, then enter a name (for example, `prod-search-service`).
4. Copy the token immediately and store it securely. 

Use this token as a long-lived API key in your requests.

### Option 2: Token endpoint

You can also request a short-lived token programmatically by calling the `/auth/token` endpoint.

**Request**

```bash
curl -X POST https://api.synonyms.io/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'
```

**Response**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

Use the `access_token` value in the `Authorization` header:

```bash
curl -X GET "https://api.synonyms.io/v1/synonyms" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Accept: application/json"
```


## Token expiry and refresh

| Token type         | Lifetime                        | Renewal                       |
| ------------------ | ------------------------------- | ----------------------------- |
| Dashboard API key  | Does not expire (until revoked) | Revoke and generate a new key |
| Programmatic token | 3600 seconds (1 hour)           | Request a new token           |

For short-lived tokens, monitor the `expires_in` value and request a new token before it expires. The API does not provide a refresh token. Call `/v1/auth/token` again with your credentials.

## Authentication errors

| Status Code | Meaning | Common Cause |
|---|---|---|
| `401 Unauthorized` | Token missing, malformed, or expired | Missing header, incorrect format, or expired token |
| `403 Forbidden` | Token is valid but lacks permission | UUsing a read-only key for a write operation |


## Security best practices

**Don’t hard-code tokens in source code.** Anyone with access to your repository or build artifacts can read them.

```bash
# Avoid this
curl -H "Authorization: Bearer eyJhbGciOi..." ...

# Use an environment variable instead
export SYNONYMS_API_TOKEN="eyJhbGciOi..."
curl -H "Authorization: Bearer $SYNONYMS_API_TOKEN" ...
```

Follow these recommendations:

- Use environment variables or a secrets manager to store tokens.
- Create separate API keys per service or environment (for example,`dev`, `staging`, `prod`).
- Grant only the permissions required for each key.
- Rotate keys regularly and revoke compromised tokens immediately.
- Monitor key usage in the developer dashboard.
- Do not log `Authorization` headers or token values.

