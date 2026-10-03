# Application Tracker Automation

A web-based application tracker that captures university, job, scholarship, and visa applications through a custom form and automates data storage and notifications with n8n.

## Overview

This project helps users keep important applications in one place.

When a user submits the website form, the application is automatically sent to an n8n Production Webhook. The workflow stores the data in Google Sheets, sends a Telegram notification, and returns a success response to the website.

## Workflow

```text
Website Form
    ↓
n8n Production Webhook
    ↓
Google Sheets
    ↓
Telegram Notification
    ↓
Success Response to Website
```

## Features

- Responsive application intake form
- Supports university, job, scholarship, visa, and other application types
- Client-side required-field validation
- Sends structured JSON data to an n8n webhook
- Automatically appends each application to Google Sheets
- Sends a Telegram notification for every new application
- Shows success and error feedback on the website
- Keeps the production webhook URL outside the public repository

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- n8n
- Google Sheets
- Telegram Bot API
- Git and GitHub

## Project Structure

```text
application-tracker-automation/
├── .gitignore
├── config.example.js
├── index.html
├── script.js
├── styles.css
└── README.md
```

> `config.js` is intentionally excluded from GitHub because it contains the private n8n Production Webhook URL.

## Local Setup

1. Clone this repository:

```bash
git clone [https://github.com/ErfansaffarAI/application-tracker-automation.git](https://github.com/ErfansaffarAI/application-tracker-automation.git)
```

2. Create a local file named `config.js` in the project root.

3. Add your own n8n Production Webhook URL:

```javascript
const WEBHOOK_URL = "PASTE_YOUR_N8N_PRODUCTION_WEBHOOK_URL_HERE";
```

4. Ensure these scripts are loaded at the end of `index.html`:

```html
<script src="config.js"></script>
<script src="script.js"></script>
```

5. Open `index.html` with Live Server in VS Code.

## n8n Workflow Setup

The n8n workflow uses the following nodes:

```text
Webhook → Google Sheets → Telegram → Respond to Webhook
```

### Webhook

- HTTP Method: `POST`
- Response mode: `Using Respond to Webhook Node`
- Use the Production Webhook URL in `config.js`

### Google Sheets

The Google Sheets node appends a new row with these fields:

```text
created_at
institution
application_type
program_or_role
country
deadline
status
documents_needed
application_url
notes
```

### Telegram

The Telegram node sends an instant notification with the submitted application details.

## Security Note

The file `config.js` is included in `.gitignore` and is not pushed to GitHub.

This prevents accidental publication of the personal n8n Production Webhook URL. For a public production application, additional server-side validation and anti-spam protection should be added.

## Future Improvements

- Daily deadline reminders through Telegram
- Duplicate application detection
- Google Calendar integration
- Application status dashboard
- Search and filters
- Email notifications
- AI-assisted extraction of deadlines and required documents from emails or application pages

## Author

Built by [Erfan Saffar](https://github.com/ErfansaffarAI) as an AI Automation and n8n portfolio project.

