const form = document.getElementById("applicationForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");

function setMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = "form-message";

  if (type) {
    formMessage.classList.add(type);
  }
}

function setButtonState(isLoading) {
  submitButton.disabled = isLoading;

  if (isLoading) {
    submitButton.innerHTML =
      "<span>Saving application...</span><span>⏳</span>";
  } else {
    submitButton.innerHTML =
      "<span>Save application</span><span>→</span>";
  }
}

function getApplicationData() {
  const formData = new FormData(form);

  return {
    created_at: new Date().toISOString(),
    institution: formData.get("institution").trim(),
    application_type: formData.get("application_type"),
    program_or_role: formData.get("program_or_role").trim(),
    country: formData.get("country").trim(),
    deadline: formData.get("deadline"),
    status: formData.get("status"),
    documents_needed: formData.get("documents_needed").trim(),
    application_url: formData.get("application_url").trim(),
    notes: formData.get("notes").trim(),
  };
}

async function sendApplicationToN8n(application) {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");

  if (!form.checkValidity()) {
    form.reportValidity();
    setMessage("Please complete all required fields correctly.", "error");
    return;
  }

  if (
    WEBHOOK_URL === "PASTE_YOUR_REAL_PRODUCTION_WEBHOOK_URL_HERE" ||
    WEBHOOK_URL === "PASTE_YOUR_N8N_PRODUCTION_WEBHOOK_URL_HERE"
  ) {
    setMessage(
      "Webhook URL is not connected yet. Add your n8n Production Webhook URL in config.js.",
      "error"
    );
    return;
  }

  const application = getApplicationData();

  try {
    setButtonState(true);

    const result = await sendApplicationToN8n(application);

    console.log("n8n response:", result);

    setMessage(
      "Application saved successfully. Your tracker has been updated.",
      "success"
    );

    form.reset();
  } catch (error) {
    console.error("Failed to save application:", error);

    setMessage(
      "We could not save your application. Please check the webhook connection and try again.",
      "error"
    );
  } finally {
    setButtonState(false);
  }
});
