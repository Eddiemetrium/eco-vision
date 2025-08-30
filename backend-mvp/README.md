# Climate Credits MVP (Backend, Flask)

**MVP scope**: farmer onboarding (REST/USSD), practice logging → provisional credits, verification → verified credits, pooling into lots, buyer purchase with attestation hash, mock M-Pesa payouts.

## Quickstart
\`\`\`bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
flask db init && flask db migrate -m "init" && flask db upgrade
flask run
# Swagger: http://127.0.0.1:5000/apidocs/
\`\`\`

## Key Endpoints
- \`POST /api/v1/farmers\` {"name","phone","coop_name?"}
- \`POST /api/v1/plots\`
- \`POST /api/v1/events\` {"plot_id","type":"agroforestry|cover_crop","quantity", "media_uri?","gps?","date?"}
- \`POST /api/v1/events/{id}/verify\` (header \`X-Admin-Key\`)
- \`POST /api/v1/lots/pool\` (header \`X-Admin-Key\`)
- \`GET  /api/v1/lots\`
- \`POST /api/v1/buyers/purchase\` {"lot_id","buyer":{...},"price_per_tco2e_kes?"}
- \`GET  /api/v1/lots/{id}/receipt\`
- \`POST /api/v1/payouts/run\` {"lot_id"} (header \`X-Admin-Key\`)
- \`GET  /api/v1/farmers/{id}/wallet\`
- \`POST /api/v1/ussd\` (Africa\'s Talking webhook)

> **Note**: Carbon factors, pricing, and payouts here are placeholders for demo purposes only.
