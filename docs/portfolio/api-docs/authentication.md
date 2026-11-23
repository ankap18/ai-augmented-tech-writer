---
title: Authenticate Synonyms API requests
sidebar_label: Authentication
description: Learn how to authenticate Synonyms API requests with an API key or an access token.
sidebar_custom_props:
  card_icon: img/icons/lock.svg
  card_icon_invert_dark: true
---

The Synonyms API uses bearer token authentication. Every request must include an access token in the `Authorization` header. Requests without a token, or with an invalid or expired token, return `401 Unauthorized`.

You can use two kinds of access tokens:

- **API key**: a long-lived access token that you generate in the developer dashboard. Use an API key for most integrations, such as a service that calls the API continuously.
- **Short-lived access token**: an access token that expires after one hour. Request it from the token endpoint with your client credentials. Use it when your security policy doesn't allow long-lived credentials.

## Get an access token

You can get an access token in one of the following ways.

### Generate an API key

1. Sign in to the [developer dashboard](https://dashboard.synonyms.io).
2. Go to **Settings > API Keys**.
3. Select **Generate new key**, then enter a name for the key, for example, `prod-search-service`.
4. Select the access level: **Read only** or **Read and write**.
5. Copy the API key and store it securely. The dashboard shows the key only once.

### Request a short-lived access token

1. In the [developer dashboard](https://dashboard.synonyms.io), go to **Settings > API Clients**.
2. Select **Create client**, then copy the client ID and client secret.
3. Send your client credentials to the token endpoint:

   ```bash
   curl -X POST "https://api.synonyms.io/v1/auth/token" \
     -H "Content-Type: application/json" \
     -d '{
       "client_id": "CLIENT_ID",
       "client_secret": "CLIENT_SECRET"
     }'
   ```

   Replace the following:

   - `CLIENT_ID`: the client ID from step 2.
   - `CLIENT_SECRET`: the client secret from step 2.

   The response contains the access token and its lifetime in seconds:

   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "Bearer",
     "expires_in": 3600
   }
   ```

The token endpoint isn't part of the [OpenAPI specification](pathname:///synonyms-api.yaml), which covers only synonym entries.

## Send a request with a token

Include your API key or access token in the `Authorization` header of every request:

```bash
curl -X GET "https://api.synonyms.io/v1/synonyms" \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

Replace `ACCESS_TOKEN` with your API key or with the `access_token` value from the token endpoint.

The API validates the token on every request. Authentication is stateless, so the API doesn't use sessions or cookies.

## Token expiry and renewal

API keys and short-lived access tokens expire and renew differently:

| Token type | Lifetime | Renewal |
|---|---|---|
| API key | Doesn't expire until you revoke it | Revoke the key and generate a new one |
| Short-lived access token | 3600 seconds (1 hour) | Request a new token |

For short-lived access tokens, track the `expires_in` value and request a new token before the current one expires. The API doesn't provide refresh tokens. To renew a token, call `POST /auth/token` again with your client credentials.

## Authentication errors

The API returns the following errors when authentication fails:

| Status code | Meaning | Common cause |
|---|---|---|
| `401 Unauthorized` | The token is missing, malformed, or expired. | The `Authorization` header is missing, doesn't start with `Bearer`, or contains an expired token. |
| `403 Forbidden` | The token is valid but doesn't have permission for the operation. | The request uses a read-only API key to create, update, or delete an entry. |

For all error codes and the error response format, see [Errors](generated/synonyms-api/synonyms.tag.mdx#errors) in the API reference.

## Security best practices

Don't hard-code API keys or access tokens in source code. Anyone with access to your repository or build artifacts can read them. Store them in an environment variable or a secrets manager instead:

```bash
# Don't do this
curl -H "Authorization: Bearer eyJhbGciOi..." ...

# Do this
export SYNONYMS_API_KEY="API_KEY"
curl -H "Authorization: Bearer $SYNONYMS_API_KEY" ...
```

Also follow these recommendations:

- Create a separate API key for each service or environment, for example, `dev`, `staging`, and `prod`.
- Give each API key only the access level it needs.
- Rotate API keys regularly, and revoke compromised keys immediately.
- Monitor API key usage in the developer dashboard.
- Don't log `Authorization` headers or token values.
